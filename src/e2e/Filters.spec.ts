import { expect, test } from '@playwright/test';

import {
  checkDeviceNamesOrder,
  checkDevicesHDDOrder,
  checkNumberOfDevices,
  selectDeviceType,
  selectSortBy,
} from './utils/form.assertions';

test.describe.configure({ mode: 'parallel' });
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.afterEach(async ({ page }) => {
  await page.close();
});
test.describe('Filtering devices by word search', () => {
  test('As an User, I am able to filter devices by word search', async ({ page }) => {
    await checkNumberOfDevices(page, 12);
    await page.getByPlaceholder('Search').click();
    await page.getByPlaceholder('Search').fill('MOCKED-DESKTOP-SMART');
    await page.waitForTimeout(500);
    await expect(page.getByTestId('devices-list')).toContainText('MOCKED-DESKTOP-SMART');
    await checkNumberOfDevices(page, 1);
  });
});
test.describe("Filtering devices by 'Device Type'", () => {
  test('As an User, I am able to filter devices by device type: WINDOWS', async ({ page }) => {
    await checkNumberOfDevices(page, 12);
    await selectDeviceType(page, 'Windows');
    await expect(page.getByTestId('devices-list')).toContainText('Windows');
    await checkNumberOfDevices(page, 6);
  });
  test('As an User, I am able to filter devices by device type: MAC', async ({ page }) => {
    await checkNumberOfDevices(page, 12);
    await selectDeviceType(page, 'Mac');
    await expect(page.getByTestId('devices-list')).toContainText('Mac');
    await checkNumberOfDevices(page, 4);
  });
  test('As an User, I am able to filter devices by device type: LINUX', async ({ page }) => {
    await checkNumberOfDevices(page, 12);

    await selectDeviceType(page, 'Linux');
    await expect(page.getByTestId('devices-list')).toContainText('Linux');
    await checkNumberOfDevices(page, 2);
  });
  test('As an User, I am able to filter devices by device types: WINDOWS and LINUX', async ({
    page,
  }) => {
    await checkNumberOfDevices(page, 12);

    await selectDeviceType(page, 'Windows');

    await selectDeviceType(page, 'Linux');
    await expect(page.getByTestId('devices-list')).toContainText('Windows');
    await expect(page.getByTestId('devices-list')).toContainText('Linux');

    await expect(page.getByTestId('device-list-wrapper')).toContainText(
      'Device Type: Windows, Linux',
    );
    await checkNumberOfDevices(page, 8);
  });
  test('As an User, I am able to filter devices by device types: WINDOWS and MAC', async ({
    page,
  }) => {
    await checkNumberOfDevices(page, 12);

    await selectDeviceType(page, 'Windows');

    await selectDeviceType(page, 'Mac');

    await expect(page.getByTestId('devices-list')).toContainText('Windows');
    await expect(page.getByTestId('devices-list')).toContainText('Mac');

    await expect(page.getByTestId('device-list-wrapper')).toContainText(
      'Device Type: Windows, Mac',
    );
    await checkNumberOfDevices(page, 10);
  });
  test('As an User, I am able to filter devices by device types: MAC and LINUX', async ({
    page,
  }) => {
    await checkNumberOfDevices(page, 12);

    await selectDeviceType(page, 'Mac');

    await selectDeviceType(page, 'Linux');

    await expect(page.getByTestId('devices-list')).toContainText('Mac');
    await expect(page.getByTestId('devices-list')).toContainText('Linux');

    await expect(page.getByTestId('device-list-wrapper')).toContainText('Device Type: Mac, Linux');
    await checkNumberOfDevices(page, 6);
  });
  test('As an User, I am able to filter devices by device types: MAC and LINUX and then see all device types', async ({
    page,
  }) => {
    await checkNumberOfDevices(page, 12);

    await selectDeviceType(page, 'Mac');

    await selectDeviceType(page, 'Linux');

    await expect(page.getByTestId('devices-list')).toContainText('Mac');
    await expect(page.getByTestId('devices-list')).toContainText('Linux');

    await expect(page.getByTestId('device-list-wrapper')).toContainText('Device Type: Mac, Linux');
    await checkNumberOfDevices(page, 6);

    await selectDeviceType(page, 'All');

    await expect(page.getByTestId('device-list-wrapper')).toContainText('Device Type: All');
    await checkNumberOfDevices(page, 12);
  });
  test('As an User, I am able to see each type of device until I select 3. Then I need to see all Devices', async ({
    page,
  }) => {
    await checkNumberOfDevices(page, 12);

    await selectDeviceType(page, 'Windows');
    await checkNumberOfDevices(page, 6);
    await selectDeviceType(page, 'Mac');
    await checkNumberOfDevices(page, 10);
    await selectDeviceType(page, 'Linux');

    await expect(page.getByTestId('devices-list')).toContainText('Windows');
    await expect(page.getByTestId('devices-list')).toContainText('Mac');
    await expect(page.getByTestId('devices-list')).toContainText('Linux');

    await expect(page.getByTestId('device-list-wrapper')).toContainText('Device Type: All');
    await checkNumberOfDevices(page, 12);
  });
});
test.describe('Sorting devices', () => {
  const hddSizeAscending = [10, 50, 180, 220, 256, 256, 302, 500, 500, 512, 750, 2048];
  const hddSizeDescending = hddSizeAscending.slice().reverse();

  const nameAscending = [
    'MOCKED-ARMANDO',
    'MOCKED-DESKTOP-SMART',
    'MOCKED-FIRST-MAC',
    'MOCKED-GILBERT-COMPUTER',
    'MOCKED-GOOD-MAC',
    'MOCKED-HOME-ONE',
    'MOCKED-JACK-GUEST',
    'MOCKED-JULIO-MAC-LOCAL',
    'MOCKED-MAC-LEADER',
    'MOCKED-MIGUEL-PC',
    'MOCKED-MOON-SMART',
    'MOCKED-RYANN-HOST',
  ];
  const nameDescending = nameAscending.slice().reverse();
  test('As an User, I am able to sort devices by HDD Capacity in ascending order by default', async ({
    page,
  }) => {
    await checkNumberOfDevices(page, 12);
    await checkDevicesHDDOrder(page, hddSizeAscending);
  });
  test('As an User, I am able to sort devices by HDD Capacity in descending order', async ({
    page,
  }) => {
    await checkNumberOfDevices(page, 12);
    await selectSortBy(page, 'HDD Capacity (Descending)');
    await checkDevicesHDDOrder(page, hddSizeDescending);
  });
  test('As an User, I am able to sort devices by System Name in ascending order', async ({
    page,
  }) => {
    await checkNumberOfDevices(page, 12);
    await selectSortBy(page, 'Name (Ascending)');
    await checkDeviceNamesOrder(page, nameAscending);
  });
  test('As an User, I am able to sort devices by System Name in descending order', async ({
    page,
  }) => {
    await checkNumberOfDevices(page, 12);
    await selectSortBy(page, 'Name (Descending)');
    await checkDeviceNamesOrder(page, nameDescending);
  });
});
test.describe('Combining Filters', () => {
  test.describe('Search and Device Type', () => {
    test('As an User, I am able to filter devices by type Mac and search by name', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 12);
      await selectDeviceType(page, 'Mac');
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('L');
      await page.waitForTimeout(500);
      await checkNumberOfDevices(page, 2);
      await checkDeviceNamesOrder(page, ['MOCKED-JULIO-MAC-LOCAL', 'MOCKED-MAC-LEADER']);
      await checkDevicesHDDOrder(page, [512, 2048]);
    });
    test('As an User, I am able to filter devices by type Windows and search by name', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 12);
      await selectDeviceType(page, 'Windows');
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('A');
      await page.waitForTimeout(500);
      await checkNumberOfDevices(page, 3);
      await checkDeviceNamesOrder(page, [
        'MOCKED-DESKTOP-SMART',
        'MOCKED-ARMANDO',
        'MOCKED-MOON-SMART',
      ]);
      await checkDevicesHDDOrder(page, [10, 256, 256]);
    });
    test('As an User, I am able to filter devices by type Linux and search by name', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 12);
      await selectDeviceType(page, 'Linux');
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('G');
      await page.waitForTimeout(500);
      await checkNumberOfDevices(page, 1);
    });
    test('As an User, I am able to filter devices by type Windows and Mac and search by name', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 12);
      await selectDeviceType(page, 'Windows');
      await selectDeviceType(page, 'Mac');
      await checkNumberOfDevices(page, 10);
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('OO');
      await page.waitForTimeout(500);
      await checkNumberOfDevices(page, 2);
      await checkDeviceNamesOrder(page, ['MOCKED-MOON-SMART', 'MOCKED-GOOD-MAC']);
      await checkDevicesHDDOrder(page, [256, 500]);
    });
    test('As an User, I am able to filter devices by type Windows and Linux and search by name', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 12);
      await selectDeviceType(page, 'Windows');
      await selectDeviceType(page, 'Linux');
      await checkNumberOfDevices(page, 8);
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('G');
      await page.waitForTimeout(500);
      await checkNumberOfDevices(page, 3);
      await checkDeviceNamesOrder(page, [
        'MOCKED-JACK-GUEST',
        'MOCKED-MIGUEL-PC',
        'MOCKED-GILBERT-COMPUTER',
      ]);
      await checkDevicesHDDOrder(page, [302, 500, 750]);
    });
    test('As an User, I am able to filter devices by type Mac and Linux and search by name', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 12);
      await selectDeviceType(page, 'Mac');
      await selectDeviceType(page, 'Linux');
      await checkNumberOfDevices(page, 6);
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('G');
      await page.waitForTimeout(500);
      await checkNumberOfDevices(page, 2);
      await checkDeviceNamesOrder(page, ['MOCKED-JACK-GUEST', 'MOCKED-GOOD-MAC']);
      await checkDevicesHDDOrder(page, [302, 500]);
    });
  });

  test.describe('Search and Sort', () => {
    test('As an User, I am able to search by name and sort by HDD Capacity in ascending order', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 12);
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('A');
      await page.waitForTimeout(500);
      await checkNumberOfDevices(page, 9);
      await checkDevicesHDDOrder(page, [10, 180, 220, 256, 256, 302, 500, 512, 2048]);
    });
    test('As an User, I am able to search by name and sort by HDD Capacity in descending order', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 12);
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('A');
      await page.waitForTimeout(500);
      await checkNumberOfDevices(page, 9);
      await selectSortBy(page, 'HDD Capacity (Descending)');
      await checkDevicesHDDOrder(page, [2048, 512, 500, 302, 256, 256, 220, 180, 10]);
    });
    test('As an User, I am able to search by name and sort by System Name in ascending order', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 12);
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('A');
      await page.waitForTimeout(500);
      await checkNumberOfDevices(page, 9);
      await selectSortBy(page, 'Name (Ascending)');
      await checkDeviceNamesOrder(page, [
        'MOCKED-ARMANDO',
        'MOCKED-DESKTOP-SMART',
        'MOCKED-FIRST-MAC',
        'MOCKED-GOOD-MAC',
        'MOCKED-JACK-GUEST',
        'MOCKED-JULIO-MAC-LOCAL',
        'MOCKED-MAC-LEADER',
        'MOCKED-MOON-SMART',
        'MOCKED-RYANN-HOST',
      ]);
    });
    test('As an User, I am able to search by name and sort by System Name in descending order', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 12);
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('A');
      await page.waitForTimeout(500);
      await checkNumberOfDevices(page, 9);
      await selectSortBy(page, 'Name (Descending)');
      await checkDeviceNamesOrder(page, [
        'MOCKED-RYANN-HOST',
        'MOCKED-MOON-SMART',
        'MOCKED-MAC-LEADER',
        'MOCKED-JULIO-MAC-LOCAL',
        'MOCKED-JACK-GUEST',
        'MOCKED-GOOD-MAC',
        'MOCKED-FIRST-MAC',
        'MOCKED-DESKTOP-SMART',
        'MOCKED-ARMANDO',
      ]);
    });
  });
  test.describe('Device Type and Sort', () => {
    test.describe('Windows', () => {
      test('As an User, I am able to filter devices by type Windows and sort by HDD Capacity in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Windows');
        await checkNumberOfDevices(page, 6);
        await checkDevicesHDDOrder(page, [10, 50, 256, 256, 500, 750]);
      });
      test('As an User, I am able to filter devices by type Windows and sort by HDD Capacity in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Windows');
        await checkNumberOfDevices(page, 6);
        await selectSortBy(page, 'HDD Capacity (Descending)');
        await checkDevicesHDDOrder(page, [750, 500, 256, 256, 50, 10]);
      });
      test('As an User, I am able to filter devices by type Windows and sort by System Name in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Windows');
        await checkNumberOfDevices(page, 6);
        await selectSortBy(page, 'Name (Ascending)');
        await checkDeviceNamesOrder(page, [
          'MOCKED-ARMANDO',
          'MOCKED-DESKTOP-SMART',
          'MOCKED-GILBERT-COMPUTER',
          'MOCKED-HOME-ONE',
          'MOCKED-MIGUEL-PC',
          'MOCKED-MOON-SMART',
        ]);
      });
      test('As an User, I am able to filter devices by type Windows and sort by System Name in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Windows');
        await checkNumberOfDevices(page, 6);
        await selectSortBy(page, 'Name (Descending)');
        await checkDeviceNamesOrder(page, [
          'MOCKED-MOON-SMART',
          'MOCKED-MIGUEL-PC',
          'MOCKED-HOME-ONE',
          'MOCKED-GILBERT-COMPUTER',
          'MOCKED-DESKTOP-SMART',
          'MOCKED-ARMANDO',
        ]);
      });
    });
    test.describe('Mac', () => {
      test('As an User, I am able to filter devices by type Mac and sort by HDD Capacity in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Mac');
        await checkNumberOfDevices(page, 4);
        await checkDevicesHDDOrder(page, [180, 500, 512, 2048]);
      });
      test('As an User, I am able to filter devices by type Mac and sort by HDD Capacity in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Mac');
        await checkNumberOfDevices(page, 4);
        await selectSortBy(page, 'HDD Capacity (Descending)');
        await checkDevicesHDDOrder(page, [2048, 512, 500, 180]);
      });
      test('As an User, I am able to filter devices by type Mac and sort by System Name in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Mac');
        await checkNumberOfDevices(page, 4);
        await selectSortBy(page, 'Name (Ascending)');
        await checkDeviceNamesOrder(page, [
          'MOCKED-FIRST-MAC',
          'MOCKED-GOOD-MAC',
          'MOCKED-JULIO-MAC-LOCAL',
          'MOCKED-MAC-LEADER',
        ]);
      });
      test('As an User, I am able to filter devices by type Mac and sort by System Name in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Mac');
        await checkNumberOfDevices(page, 4);
        await selectSortBy(page, 'Name (Descending)');
        await checkDeviceNamesOrder(page, [
          'MOCKED-MAC-LEADER',
          'MOCKED-JULIO-MAC-LOCAL',
          'MOCKED-GOOD-MAC',
          'MOCKED-FIRST-MAC',
        ]);
      });
    });
    test.describe('Linux', () => {
      test('As an User, I am able to filter devices by type Linux and sort by HDD Capacity in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Linux');
        await checkNumberOfDevices(page, 2);
        await checkDevicesHDDOrder(page, [220, 302]);
      });
      test('As an User, I am able to filter devices by type Linux and sort by HDD Capacity in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Linux');
        await checkNumberOfDevices(page, 2);
        await selectSortBy(page, 'HDD Capacity (Descending)');
        await checkDevicesHDDOrder(page, [302, 220]);
      });
      test('As an User, I am able to filter devices by type Linux and sort by System Name in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Linux');
        await checkNumberOfDevices(page, 2);
        await selectSortBy(page, 'Name (Ascending)');
        await checkDeviceNamesOrder(page, ['MOCKED-JACK-GUEST', 'MOCKED-RYANN-HOST']);
      });
      test('As an User, I am able to filter devices by type Linux and sort by System Name in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Linux');
        await checkNumberOfDevices(page, 2);
        await selectSortBy(page, 'Name (Descending)');
        await checkDeviceNamesOrder(page, ['MOCKED-RYANN-HOST', 'MOCKED-JACK-GUEST']);
      });
    });
    test.describe('Windows and Linux', () => {
      test('As an User, I am able to filter devices by type Windows and Linux and sort by HDD Capacity in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Linux');
        await selectDeviceType(page, 'Windows');
        await checkDevicesHDDOrder(page, [10, 50, 220, 256, 256, 302, 500, 750]);
      });
      test('As an User, I am able to filter devices by type Windows and Linux and sort by HDD Capacity in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Linux');
        await selectDeviceType(page, 'Windows');
        await selectSortBy(page, 'HDD Capacity (Descending)');
        await checkDevicesHDDOrder(page, [750, 500, 302, 256, 256, 220, 50, 10]);
      });
      test('As an User, I am able to filter devices by type Windows and Linux and sort by System Name in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Linux');
        await selectDeviceType(page, 'Windows');
        await selectSortBy(page, 'Name (Ascending)');
        await checkDeviceNamesOrder(page, [
          'MOCKED-ARMANDO',
          'MOCKED-DESKTOP-SMART',
          'MOCKED-GILBERT-COMPUTER',
          'MOCKED-HOME-ONE',
          'MOCKED-JACK-GUEST',
          'MOCKED-MIGUEL-PC',
          'MOCKED-MOON-SMART',
          'MOCKED-RYANN-HOST',
        ]);
      });
      test('As an User, I am able to filter devices by type Windows and Linux and sort by System Name in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Linux');
        await selectDeviceType(page, 'Windows');
        await selectSortBy(page, 'Name (Descending)');
        await checkDeviceNamesOrder(page, [
          'MOCKED-RYANN-HOST',
          'MOCKED-MOON-SMART',
          'MOCKED-MIGUEL-PC',
          'MOCKED-JACK-GUEST',
          'MOCKED-HOME-ONE',
          'MOCKED-GILBERT-COMPUTER',
          'MOCKED-DESKTOP-SMART',
          'MOCKED-ARMANDO',
        ]);
      });
    });
    test.describe('Windows and Mac', () => {
      test('As an User, I am able to filter devices by type Windows and Mac and sort by HDD Capacity in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Mac');
        await selectDeviceType(page, 'Windows');
        await checkDevicesHDDOrder(page, [10, 50, 180, 256, 256, 500, 500, 512, 750, 2048]);
      });
      test('As an User, I am able to filter devices by type Windows and Mac and sort by HDD Capacity in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Mac');
        await selectDeviceType(page, 'Windows');
        await selectSortBy(page, 'HDD Capacity (Descending)');
        await checkDevicesHDDOrder(page, [2048, 750, 512, 500, 500, 256, 256, 180, 50, 10]);
      });
      test('As an User, I am able to filter devices by type Windows and Mac and sort by System Name in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Mac');
        await selectDeviceType(page, 'Windows');
        await selectSortBy(page, 'Name (Ascending)');
        await checkDeviceNamesOrder(page, [
          'MOCKED-ARMANDO',
          'MOCKED-DESKTOP-SMART',
          'MOCKED-FIRST-MAC',
          'MOCKED-GILBERT-COMPUTER',
          'MOCKED-GOOD-MAC',
          'MOCKED-HOME-ONE',
          'MOCKED-JULIO-MAC-LOCAL',
          'MOCKED-MAC-LEADER',
          'MOCKED-MIGUEL-PC',
          'MOCKED-MOON-SMART',
        ]);
      });
      test('As an User, I am able to filter devices by type Windows and Mac and sort by System Name in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Mac');
        await selectDeviceType(page, 'Windows');
        await selectSortBy(page, 'Name (Descending)');
        await checkDeviceNamesOrder(page, [
          'MOCKED-MOON-SMART',
          'MOCKED-MIGUEL-PC',
          'MOCKED-MAC-LEADER',
          'MOCKED-JULIO-MAC-LOCAL',
          'MOCKED-HOME-ONE',
          'MOCKED-GOOD-MAC',
          'MOCKED-GILBERT-COMPUTER',
          'MOCKED-FIRST-MAC',
          'MOCKED-DESKTOP-SMART',
          'MOCKED-ARMANDO',
        ]);
      });
    });
    test.describe('Mac and Linux', () => {
      test('As an User, I am able to filter devices by type Linux and Mac and sort by HDD Capacity in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Mac');
        await selectDeviceType(page, 'Linux');
        await checkDevicesHDDOrder(page, [180, 220, 302, 500, 512, 2048]);
      });
      test('As an User, I am able to filter devices by type Linux and Mac and sort by HDD Capacity in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Mac');
        await selectDeviceType(page, 'Linux');
        await selectSortBy(page, 'HDD Capacity (Descending)');
        await checkDevicesHDDOrder(page, [2048, 512, 500, 302, 220, 180]);
      });
      test('As an User, I am able to filter devices by type Linux and Mac and sort by System Name in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Mac');
        await selectDeviceType(page, 'Linux');
        await selectSortBy(page, 'Name (Ascending)');
        await checkDeviceNamesOrder(page, [
          'MOCKED-FIRST-MAC',
          'MOCKED-GOOD-MAC',
          'MOCKED-JACK-GUEST',
          'MOCKED-JULIO-MAC-LOCAL',
          'MOCKED-MAC-LEADER',
          'MOCKED-RYANN-HOST',
        ]);
      });
      test('As an User, I am able to filter devices by type Linux and Mac and sort by System Name in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 12);
        await selectDeviceType(page, 'Mac');
        await selectDeviceType(page, 'Linux');
        await selectSortBy(page, 'Name (Descending)');
        await checkDeviceNamesOrder(page, [
          'MOCKED-RYANN-HOST',
          'MOCKED-MAC-LEADER',
          'MOCKED-JULIO-MAC-LOCAL',
          'MOCKED-JACK-GUEST',
          'MOCKED-GOOD-MAC',
          'MOCKED-FIRST-MAC',
        ]);
      });
    });
  });
  test.describe('Search, Device Type and Sort', () => {
    test('As an User, I am able to filter devices by type Windows and search by name and sort by HDD Capacity in descending order', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 12);
      await selectDeviceType(page, 'Windows');
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('A');
      await page.waitForTimeout(500);
      await selectSortBy(page, 'HDD Capacity (Descending)');
      await checkNumberOfDevices(page, 3);
      await checkDevicesHDDOrder(page, [256, 256, 10]);
    });
    test('As an User, I am able to filter devices by Mac and Linux, search by name and sort by System Name in ascending order', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 12);
      await selectDeviceType(page, 'Mac');
      await selectDeviceType(page, 'Linux');
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('G');
      await page.waitForTimeout(500);
      await selectSortBy(page, 'Name (Ascending)');
      await checkNumberOfDevices(page, 2);
      await checkDeviceNamesOrder(page, ['MOCKED-GOOD-MAC', 'MOCKED-JACK-GUEST']);
    });
  });
});
