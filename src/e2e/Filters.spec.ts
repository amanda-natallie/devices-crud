import { expect, test } from '@playwright/test';

import {
  checkDeviceNamesOrder,
  checkDevicesHDDOrder,
  checkNumberOfDevices,
  selectDeviceType,
  selectSortBy,
} from './utils/assertions';
import {
  linuxMacNameAscOrder,
  linuxMacNameDescOrder,
  linuxNameAscOrder,
  linuxNameDescOrder,
  linuxSearchNameAscOrder,
  macLinuxSearchOrder,
  macNameAscOrder,
  macNameDescOrder,
  macSearchOrder,
  nameAscOrder,
  nameAscSearchOrder,
  nameDescOrder,
  nameDescSearchOrder,
  windowsLinuxNameAscOrder,
  windowsLinuxNameDescOrder,
  windowsLinuxSearchOrder,
  windowsMacNameAscOrder,
  windowsMacNameDescOrder,
  windowsMacSearchOrder,
  windowsNameAscOrder,
  windowsNameDescOrder,
  windowsSearchOrder,
} from './utils/constants';

test.describe.configure({ mode: 'parallel' });
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.afterEach(async ({ page }) => {
  await page.close();
});
test.describe('Filtering devices by word search', () => {
  test('As an User, I am able to filter devices by word search', async ({ page }) => {
    await checkNumberOfDevices(page, 10);
    await page.getByPlaceholder('Search').click();
    await page.getByPlaceholder('Search').fill('MOCKED-HOME-ONE');
    await page.waitForTimeout(500);
    await expect(page.getByTestId('devices-list')).toContainText('MOCKED-HOME-ONE');
    await checkNumberOfDevices(page, 1);
  });
});
test.describe("Filtering devices by 'Device Type'", () => {
  test('As an User, I am able to filter devices by device type: WINDOWS', async ({ page }) => {
    await checkNumberOfDevices(page, 10);
    await selectDeviceType(page, 'Windows');
    await expect(page.getByTestId('devices-list')).toContainText('Windows');
    await checkNumberOfDevices(page, 4);
  });
  test('As an User, I am able to filter devices by device type: MAC', async ({ page }) => {
    await checkNumberOfDevices(page, 10);
    await selectDeviceType(page, 'Mac');
    await expect(page.getByTestId('devices-list')).toContainText('Mac');
    await checkNumberOfDevices(page, 4);
  });
  test('As an User, I am able to filter devices by device type: LINUX', async ({ page }) => {
    await checkNumberOfDevices(page, 10);

    await selectDeviceType(page, 'Linux');
    await expect(page.getByTestId('devices-list')).toContainText('Linux');
    await checkNumberOfDevices(page, 2);
  });
  test('As an User, I am able to filter devices by device types: WINDOWS and LINUX', async ({
    page,
  }) => {
    await checkNumberOfDevices(page, 10);

    await selectDeviceType(page, 'Windows');

    await selectDeviceType(page, 'Linux');
    await expect(page.getByTestId('devices-list')).toContainText('Windows');
    await expect(page.getByTestId('devices-list')).toContainText('Linux');

    await expect(page.getByTestId('device-list-wrapper')).toContainText(
      'Device Type: Windows, Linux',
    );
    await checkNumberOfDevices(page, 6);
  });
  test('As an User, I am able to filter devices by device types: WINDOWS and MAC', async ({
    page,
  }) => {
    await checkNumberOfDevices(page, 10);

    await selectDeviceType(page, 'Windows');

    await selectDeviceType(page, 'Mac');

    await expect(page.getByTestId('devices-list')).toContainText('Windows');
    await expect(page.getByTestId('devices-list')).toContainText('Mac');

    await expect(page.getByTestId('device-list-wrapper')).toContainText(
      'Device Type: Windows, Mac',
    );
    await checkNumberOfDevices(page, 8);
  });
  test('As an User, I am able to filter devices by device types: MAC and LINUX', async ({
    page,
  }) => {
    await checkNumberOfDevices(page, 10);

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
    await checkNumberOfDevices(page, 10);

    await selectDeviceType(page, 'Mac');

    await selectDeviceType(page, 'Linux');

    await expect(page.getByTestId('devices-list')).toContainText('Mac');
    await expect(page.getByTestId('devices-list')).toContainText('Linux');

    await expect(page.getByTestId('device-list-wrapper')).toContainText('Device Type: Mac, Linux');
    await checkNumberOfDevices(page, 6);

    await selectDeviceType(page, 'All');

    await expect(page.getByTestId('device-list-wrapper')).toContainText('Device Type: All');
    await checkNumberOfDevices(page, 10);
  });
  test('As an User, I am able to see each type of device until I select 3. Then I need to see all Devices', async ({
    page,
  }) => {
    await checkNumberOfDevices(page, 10);

    await selectDeviceType(page, 'Windows');
    await checkNumberOfDevices(page, 4);
    await selectDeviceType(page, 'Mac');
    await checkNumberOfDevices(page, 8);
    await selectDeviceType(page, 'Linux');

    await expect(page.getByTestId('devices-list')).toContainText('Windows');
    await expect(page.getByTestId('devices-list')).toContainText('Mac');
    await expect(page.getByTestId('devices-list')).toContainText('Linux');

    await expect(page.getByTestId('device-list-wrapper')).toContainText('Device Type: All');
    await checkNumberOfDevices(page, 10);
  });
});
test.describe('Sorting devices', () => {
  test('As an User, I am able to sort devices by HDD Capacity in ascending order by default', async ({
    page,
  }) => {
    await checkNumberOfDevices(page, 10);
    await checkDevicesHDDOrder(page, [50, 180, 220, 256, 256, 302, 500, 512]);
  });
  test('As an User, I am able to sort devices by HDD Capacity in descending order', async ({
    page,
  }) => {
    await checkNumberOfDevices(page, 10);
    await selectSortBy(page, 'HDD Capacity (Descending)');
    await checkDevicesHDDOrder(page, [2048, 750, 512, 500, 302, 256, 256, 220, 180, 50]);
  });
  test('As an User, I am able to sort devices by System Name in ascending order', async ({
    page,
  }) => {
    await checkNumberOfDevices(page, 10);
    await selectSortBy(page, 'Name (Ascending)');
    await checkDeviceNamesOrder(page, nameAscOrder);
  });
  test('As an User, I am able to sort devices by System Name in descending order', async ({
    page,
  }) => {
    await checkNumberOfDevices(page, 10);
    await selectSortBy(page, 'Name (Descending)');
    await checkDeviceNamesOrder(page, nameDescOrder);
  });
});
test.describe('Combining Filters', () => {
  test.describe('Search and Device Type', () => {
    test('As an User, I am able to filter devices by type Mac and search by name', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 10);
      await selectDeviceType(page, 'Mac');
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('L');
      await page.waitForTimeout(500);
      await checkNumberOfDevices(page, 2);
      await checkDeviceNamesOrder(page, macSearchOrder);
      await checkDevicesHDDOrder(page, [512, 2048]);
    });
    test('As an User, I am able to filter devices by type Windows and search by name', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 10);
      await selectDeviceType(page, 'Windows');
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('A');
      await page.waitForTimeout(500);
      await checkNumberOfDevices(page, 2);
      await checkDeviceNamesOrder(page, windowsSearchOrder);
      await checkDevicesHDDOrder(page, [256, 256]);
    });
    test('As an User, I am able to filter devices by type Linux and search by name', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 10);
      await selectDeviceType(page, 'Linux');
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('G');
      await page.waitForTimeout(500);
      await checkNumberOfDevices(page, 1);
    });
    test('As an User, I am able to filter devices by type Windows and Mac and search by name', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 10);
      await selectDeviceType(page, 'Windows');
      await selectDeviceType(page, 'Mac');
      await checkNumberOfDevices(page, 8);
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('OO');
      await page.waitForTimeout(500);
      await checkNumberOfDevices(page, 2);
      await checkDeviceNamesOrder(page, windowsMacSearchOrder);
      await checkDevicesHDDOrder(page, [256, 500]);
    });
    test('As an User, I am able to filter devices by type Windows and Linux and search by name', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 10);
      await selectDeviceType(page, 'Windows');
      await selectDeviceType(page, 'Linux');
      await checkNumberOfDevices(page, 6);
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('G');
      await page.waitForTimeout(500);
      await checkNumberOfDevices(page, 2);
      await checkDeviceNamesOrder(page, windowsLinuxSearchOrder);
      await checkDevicesHDDOrder(page, [302, 750]);
    });
    test('As an User, I am able to filter devices by type Mac and Linux and search by name', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 10);
      await selectDeviceType(page, 'Mac');
      await selectDeviceType(page, 'Linux');
      await checkNumberOfDevices(page, 6);
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('G');
      await page.waitForTimeout(500);
      await checkNumberOfDevices(page, 2);
      await checkDeviceNamesOrder(page, macLinuxSearchOrder);
      await checkDevicesHDDOrder(page, [302, 500]);
    });
  });

  test.describe('Search and Sort', () => {
    test('As an User, I am able to search by name and sort by HDD Capacity in ascending order', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 10);
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('A');
      await page.waitForTimeout(500);
      await checkNumberOfDevices(page, 8);
      await checkDevicesHDDOrder(page, [180, 220, 256, 256, 302, 500, 512, 2048]);
    });
    test('As an User, I am able to search by name and sort by HDD Capacity in descending order', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 10);
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('A');
      await page.waitForTimeout(500);
      await checkNumberOfDevices(page, 8);
      await selectSortBy(page, 'HDD Capacity (Descending)');
      await checkDevicesHDDOrder(page, [2048, 512, 500, 302, 256, 256, 220, 180]);
    });
    test('As an User, I am able to search by name and sort by System Name in ascending order', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 10);
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('A');
      await page.waitForTimeout(500);
      await checkNumberOfDevices(page, 8);
      await selectSortBy(page, 'Name (Ascending)');
      await checkDeviceNamesOrder(page, nameAscSearchOrder);
    });
    test('As an User, I am able to search by name and sort by System Name in descending order', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 10);
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('A');
      await page.waitForTimeout(500);
      await checkNumberOfDevices(page, 8);
      await selectSortBy(page, 'Name (Descending)');
      await checkDeviceNamesOrder(page, nameDescSearchOrder);
    });
  });
  test.describe('Device Type and Sort', () => {
    test.describe('Windows', () => {
      test('As an User, I am able to filter devices by type Windows and sort by HDD Capacity in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Windows');
        await checkNumberOfDevices(page, 4);
        await checkDevicesHDDOrder(page, [50, 256, 256, 750]);
      });
      test('As an User, I am able to filter devices by type Windows and sort by HDD Capacity in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Windows');
        await checkNumberOfDevices(page, 4);
        await selectSortBy(page, 'HDD Capacity (Descending)');
        await checkDevicesHDDOrder(page, [750, 256, 256, 50]);
      });
      test('As an User, I am able to filter devices by type Windows and sort by System Name in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Windows');
        await checkNumberOfDevices(page, 4);
        await selectSortBy(page, 'Name (Ascending)');
        await checkDeviceNamesOrder(page, windowsNameAscOrder);
      });
      test('As an User, I am able to filter devices by type Windows and sort by System Name in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Windows');
        await checkNumberOfDevices(page, 4);
        await selectSortBy(page, 'Name (Descending)');
        await checkDeviceNamesOrder(page, windowsNameDescOrder);
      });
    });
    test.describe('Mac', () => {
      test('As an User, I am able to filter devices by type Mac and sort by HDD Capacity in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Mac');
        await checkNumberOfDevices(page, 4);
        await checkDevicesHDDOrder(page, [180, 500, 512, 2048]);
      });
      test('As an User, I am able to filter devices by type Mac and sort by HDD Capacity in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Mac');
        await checkNumberOfDevices(page, 4);
        await selectSortBy(page, 'HDD Capacity (Descending)');
        await checkDevicesHDDOrder(page, [2048, 512, 500, 180]);
      });
      test('As an User, I am able to filter devices by type Mac and sort by System Name in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Mac');
        await checkNumberOfDevices(page, 4);
        await selectSortBy(page, 'Name (Ascending)');
        await checkDeviceNamesOrder(page, macNameAscOrder);
      });
      test('As an User, I am able to filter devices by type Mac and sort by System Name in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Mac');
        await checkNumberOfDevices(page, 4);
        await selectSortBy(page, 'Name (Descending)');
        await checkDeviceNamesOrder(page, macNameDescOrder);
      });
    });
    test.describe('Linux', () => {
      test('As an User, I am able to filter devices by type Linux and sort by HDD Capacity in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Linux');
        await checkNumberOfDevices(page, 2);
        await checkDevicesHDDOrder(page, [220, 302]);
      });
      test('As an User, I am able to filter devices by type Linux and sort by HDD Capacity in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Linux');
        await checkNumberOfDevices(page, 2);
        await selectSortBy(page, 'HDD Capacity (Descending)');
        await checkDevicesHDDOrder(page, [302, 220]);
      });
      test('As an User, I am able to filter devices by type Linux and sort by System Name in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Linux');
        await checkNumberOfDevices(page, 2);
        await selectSortBy(page, 'Name (Ascending)');
        await checkDeviceNamesOrder(page, linuxNameAscOrder);
      });
      test('As an User, I am able to filter devices by type Linux and sort by System Name in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Linux');
        await checkNumberOfDevices(page, 2);
        await selectSortBy(page, 'Name (Descending)');
        await checkDeviceNamesOrder(page, linuxNameDescOrder);
      });
    });
    test.describe('Windows and Linux', () => {
      test('As an User, I am able to filter devices by type Windows and Linux and sort by HDD Capacity in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Linux');
        await selectDeviceType(page, 'Windows');
        await checkDevicesHDDOrder(page, [50, 220, 256, 256, 302, 750]);
      });
      test('As an User, I am able to filter devices by type Windows and Linux and sort by HDD Capacity in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Linux');
        await selectDeviceType(page, 'Windows');
        await selectSortBy(page, 'HDD Capacity (Descending)');
        await checkDevicesHDDOrder(page, [750, 302, 256, 256, 220, 50]);
      });
      test('As an User, I am able to filter devices by type Windows and Linux and sort by System Name in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Linux');
        await selectDeviceType(page, 'Windows');
        await selectSortBy(page, 'Name (Ascending)');
        await checkDeviceNamesOrder(page, windowsLinuxNameAscOrder);
      });
      test('As an User, I am able to filter devices by type Windows and Linux and sort by System Name in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Linux');
        await selectDeviceType(page, 'Windows');
        await selectSortBy(page, 'Name (Descending)');
        await checkDeviceNamesOrder(page, windowsLinuxNameDescOrder);
      });
    });
    test.describe('Windows and Mac', () => {
      test('As an User, I am able to filter devices by type Windows and Mac and sort by HDD Capacity in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Mac');
        await selectDeviceType(page, 'Windows');
        await checkDevicesHDDOrder(page, [50, 180, 256, 256, 500, 512, 750, 2048]);
      });
      test('As an User, I am able to filter devices by type Windows and Mac and sort by HDD Capacity in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Mac');
        await selectDeviceType(page, 'Windows');
        await selectSortBy(page, 'HDD Capacity (Descending)');
        await checkDevicesHDDOrder(page, [2048, 750, 512, 500, 256, 256, 180, 50]);
      });
      test('As an User, I am able to filter devices by type Windows and Mac and sort by System Name in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Mac');
        await selectDeviceType(page, 'Windows');
        await selectSortBy(page, 'Name (Ascending)');
        await checkDeviceNamesOrder(page, windowsMacNameAscOrder);
      });
      test('As an User, I am able to filter devices by type Windows and Mac and sort by System Name in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Mac');
        await selectDeviceType(page, 'Windows');
        await selectSortBy(page, 'Name (Descending)');
        await checkDeviceNamesOrder(page, windowsMacNameDescOrder);
      });
    });
    test.describe('Mac and Linux', () => {
      test('As an User, I am able to filter devices by type Linux and Mac and sort by HDD Capacity in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Mac');
        await selectDeviceType(page, 'Linux');
        await checkDevicesHDDOrder(page, [180, 220, 302, 500, 512, 2048]);
      });
      test('As an User, I am able to filter devices by type Linux and Mac and sort by HDD Capacity in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Mac');
        await selectDeviceType(page, 'Linux');
        await selectSortBy(page, 'HDD Capacity (Descending)');
        await checkDevicesHDDOrder(page, [2048, 512, 500, 302, 220, 180]);
      });
      test('As an User, I am able to filter devices by type Linux and Mac and sort by System Name in ascending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Mac');
        await selectDeviceType(page, 'Linux');
        await selectSortBy(page, 'Name (Ascending)');
        await checkDeviceNamesOrder(page, linuxMacNameAscOrder);
      });
      test('As an User, I am able to filter devices by type Linux and Mac and sort by System Name in descending order', async ({
        page,
      }) => {
        await checkNumberOfDevices(page, 10);
        await selectDeviceType(page, 'Mac');
        await selectDeviceType(page, 'Linux');
        await selectSortBy(page, 'Name (Descending)');
        await checkDeviceNamesOrder(page, linuxMacNameDescOrder);
      });
    });
  });
  test.describe('Search, Device Type and Sort', () => {
    test('As an User, I am able to filter devices by type Windows and search by name and sort by HDD Capacity in descending order', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 10);
      await selectDeviceType(page, 'Windows');
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('A');
      await page.waitForTimeout(500);
      await selectSortBy(page, 'HDD Capacity (Descending)');
      await checkNumberOfDevices(page, 2);
      await checkDevicesHDDOrder(page, [256, 256]);
    });
    test('As an User, I am able to filter devices by Mac and Linux, search by name and sort by System Name in ascending order', async ({
      page,
    }) => {
      await checkNumberOfDevices(page, 10);
      await selectDeviceType(page, 'Mac');
      await selectDeviceType(page, 'Linux');
      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('G');
      await page.waitForTimeout(500);
      await selectSortBy(page, 'Name (Ascending)');
      await checkNumberOfDevices(page, 2);
      await checkDeviceNamesOrder(page, linuxSearchNameAscOrder);
    });
  });
});
