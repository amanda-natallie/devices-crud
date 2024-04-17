#!/bin/bash

# Cor ANSI para azul
BLUE='\033[0;34m'
# Reseta a cor ANSI
RESET='\033[0m'

# Determina o sistema operacional
OS=$(uname -s)

# Determina o número de núcleos da CPU
# Se o sistema operacional for macOS, usa o comando sysctl para obter o número de núcleos
if [ $OS == "Darwin" ]; then
  NUM_CORES=$(sysctl -n hw.physicalcpu)
else 
  NUM_CORES=$(nproc --all)
fi

# Calcula o número de workers como o número de núcleos - 4
NUM_WORKERS=$((NUM_CORES - 4))

# Garante que o número de workers seja pelo menos 1
if [ $NUM_WORKERS -lt 1 ]; then
  NUM_WORKERS=1
fi

# Verifica se a opção -c foi fornecida (coverage)
if [[ $1 == "-c" ]]; then
  COVERAGE_FLAG="--coverage --silent"
  COVERAGE_MESSAGE="Vitest Coverage"
else
  COVERAGE_FLAG=""
  COVERAGE_MESSAGE="ALL Vitest Tests"
fi

 MAXWORKERS_FLAG="--maxWorkers=$NUM_WORKERS --minWorkers=1"

# Verifica se o primeiro argumento contém "src" para rodar apenas um arquivo específico
if [[ $1 != "-c" && $1 == *"src"* ]]; then
  FILE_NAME=$(basename $1)
  # Executa vitest apenas para o arquivo especificado
  echo -e "${BLUE}Running a single test file: $FILE_NAME${RESET}"
  vitest $MAXWORKERS_FLAG $COVERAGE_FLAG $1  --no-cache
elif [[ $1 == "-w" && $2 == *"src"* ]]; then
  FILE_NAME=$(basename $2)
  # Verifica se está no modo --watch e se o último argumento contém "src" para rodar em modo watch
  echo -e "${BLUE}Watching a single test file: $FILE_NAME${RESET}"
  vitest $MAXWORKERS_FLAG --silent --watch $COVERAGE_FLAG $2  --no-cache
elif [[ $1 == "-w" ]]; then
  # Verifica se está no modo --watch para personalizar a mensagem
  echo -e "${BLUE}Watching $COVERAGE_MESSAGE files${RESET}"
  vitest $MAXWORKERS_FLAG --no-cache $COVERAGE_FLAG --watch
else
  # Executa vitest com o número de workers ajustado e a opção -c, se fornecida
  echo -e "${BLUE}Running $COVERAGE_MESSAGE with $NUM_WORKERS CPU cores${RESET}"
  vitest $COVERAGE_FLAG $MAXWORKERS_FLAG --no-cache --watch=false
fi
