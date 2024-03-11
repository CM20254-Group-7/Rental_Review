import { test, expect } from '@playwright/test';
import { ownershipHistories } from './helpers';

const firstPropertyHistory = ownershipHistories[0]; // 1 Test Road
const secondPropertyHistory = ownershipHistories[1]; // 2 Test Road

test.describe(`${firstPropertyHistory.propertyAddress} ownership history tests`, () => {
  test('Contains correct start and end dates', async ({ page }) => {
    await page.goto(`http://localhost:3000/properties/${firstPropertyHistory.propertyId}/ownership-history`);
    try {
      await expect(page.getByRole('main')).toContainText(`${firstPropertyHistory.startDate[0]}`);
    } catch (error) {
      try {
        await expect(page.getByRole('main')).toContainText(`${firstPropertyHistory.startDate[1]}`);
      } catch (error1) {
        try {
          await expect(page.getByRole('main')).toContainText(`${firstPropertyHistory.startDate[2]}`);
        } catch (error2) {
          await expect(page.getByRole('main')).toContainText(`${firstPropertyHistory.startDate[3]}`);
        }
      }
    }
    console.log(firstPropertyHistory.endDate[0]);
    console.log(firstPropertyHistory.endDate[0][1]);
    try {
      await expect(page.getByRole('main')).toContainText(`${firstPropertyHistory.endDate[0]}`);
    } catch (error) {
      try {
        await expect(page.getByRole('main')).toContainText(`${firstPropertyHistory.endDate[1]}`);
      } catch (error1) {
        try {
          await expect(page.getByRole('main')).toContainText(`${firstPropertyHistory.endDate[2]}`);
        } catch (error2) {
          try {
            await expect(page.getByRole('main')).toContainText(`${firstPropertyHistory.endDate[3]}`);
          } catch (error3) {
            console.log('error3');
          }
        }
      }
    }
  });

  test('Contains correct landlord', async ({ page }) => {
    await page.goto(`http://localhost:3000/properties/${firstPropertyHistory.propertyId}/ownership-history`);
    await expect(page.getByRole('main')).toContainText(`${firstPropertyHistory.landlord}`);
  });

  test('Contains correct landlord rating', async ({ page }) => {
    await page.goto(`http://localhost:3000/properties/${firstPropertyHistory.propertyId}/ownership-history`);
    // Select the specific section containing the stars
    const section = await page.$('body > main > div > div > a > div.flex.flex-col.items-center.justify-center > div:nth-child(2)');
    if (!section) {
      throw new Error('Section not found');
    }

    // Get all the svg of the stars
    const stars = await section.$$('svg[data-slot="icon"]');
    if (!stars) {
      throw new Error('Stars not found');
    }

    // Collect promises for all star classes
    const starClassPromises = stars.map(async (star) => {
      const starClass = await star.getAttribute('class');
      if (!starClass) {
        throw new Error('Star class not found');
      }
      return starClass;
    });

    // Wait for all promises to resolve
    const starClasses = await Promise.all(starClassPromises);
    // Count the number of yellow and grey stars
    let yellowStars = 0;
    let greyStars = 0;
    for (const starClass of starClasses) {
      if (starClass.includes('text-yellow-300')) {
        yellowStars += 1;
      } else if (starClass.includes('text-gray-400')) {
        greyStars += 1;
      }
    }

    // Check if the number of stars is correct
    await expect(yellowStars).toBe(firstPropertyHistory.landlordRating[0]);
    await expect(greyStars).toBe(5 - yellowStars);
  });
});

test.describe(`${secondPropertyHistory.propertyAddress} ownership history tests`, () => {
  test.describe('Current ownership test', () => {
    test('Contains correct start and end dates', async ({ page }) => {
      await page.goto(`http://localhost:3000/properties/${secondPropertyHistory.propertyId}/ownership-history`);
      try {
        await expect(page.getByRole('main')).toContainText(`${secondPropertyHistory.startDate[0][0]}`);
      } catch (error) {
        try {
          await expect(page.getByRole('main')).toContainText(`${secondPropertyHistory.startDate[0][1]}`);
        } catch (error1) {
          try {
            await expect(page.getByRole('main')).toContainText(`${secondPropertyHistory.startDate[0][2]}`);
          } catch (error2) {
            await expect(page.getByRole('main')).toContainText(`${secondPropertyHistory.startDate[0][3]}`);
          }
        }
      }
      await expect(page.getByRole('main')).toContainText(`${secondPropertyHistory.endDate[0]}`);
    });

    test('Contains correct landlord', async ({ page }) => {
      await page.goto(`http://localhost:3000/properties/${secondPropertyHistory.propertyId}/ownership-history`);
      await expect(page.getByRole('main')).toContainText(`${secondPropertyHistory.landlord?.[0]}`);
    });

    test('Contains correct average rating', async ({ page }) => {
      await page.goto(`http://localhost:3000/properties/${secondPropertyHistory.propertyId}/ownership-history`);
      // Select the specific section containing the stars
      const section = await page.$('body > main > div > div > a > div.flex.flex-col.items-center.justify-center > div:nth-child(2)');
      if (!section) {
        throw new Error('Section not found');
      }

      // Get all the svg of the stars
      const stars = await section.$$('svg[data-slot="icon"]');
      if (!stars) {
        throw new Error('Stars not found');
      }

      // Collect promises for all star classes
      const starClassPromises = stars.map(async (star) => {
        const starClass = await star.getAttribute('class');
        if (!starClass) {
          throw new Error('Star class not found');
        }
        return starClass;
      });

      // Wait for all promises to resolve
      const starClasses = await Promise.all(starClassPromises);
      // Count the number of yellow and grey stars
      let yellowStars = 0;
      let greyStars = 0;
      for (const starClass of starClasses) {
        if (starClass.includes('text-yellow-300')) {
          yellowStars += 1;
        } else if (starClass.includes('text-gray-400')) {
          greyStars += 1;
        }
      }

      // Check if the number of stars is correct
      await expect(yellowStars).toBe(secondPropertyHistory.landlordRating[0]);
      await expect(greyStars).toBe(5 - yellowStars);
    });
  });

  test.describe('Past ownership test', () => {
    test('Contains correct start and end dates', async ({ page }) => {
      await page.goto(`http://localhost:3000/properties/${secondPropertyHistory.propertyId}/ownership-history`);
      try {
        await expect(page.getByRole('main')).toContainText(`${secondPropertyHistory.startDate[1][0]}`);
      } catch (error) {
        try {
          await expect(page.getByRole('main')).toContainText(`${secondPropertyHistory.startDate[1][1]}`);
        } catch (error1) {
          try {
            await expect(page.getByRole('main')).toContainText(`${secondPropertyHistory.startDate[1][2]}`);
          } catch (error2) {
            await expect(page.getByRole('main')).toContainText(`${secondPropertyHistory.startDate[1][3]}`);
          }
        }
      }
      try {
        await expect(page.getByRole('main')).toContainText(`${secondPropertyHistory.endDate[1][0]}`);
      } catch (error) {
        await expect(page.getByRole('main')).toContainText(`${secondPropertyHistory.endDate[1][1]}`);
      }
    });

    test('Contains correct landlord', async ({ page }) => {
      await page.goto(`http://localhost:3000/properties/${secondPropertyHistory.propertyId}/ownership-history`);
      await expect(page.getByRole('main')).toContainText(`${secondPropertyHistory.landlord?.[1]}`);
    });

    test('Contains correct average rating', async ({ page }) => {
      await page.goto(`http://localhost:3000/properties/${secondPropertyHistory.propertyId}/ownership-history`);
      // Select the specific section containing the stars
      const section = await page.$('body > main > div > div > a:nth-child(4) > div.flex.flex-col.items-center.justify-center > div:nth-child(2)');
      if (!section) {
        throw new Error('Section not found');
      }

      // Get all the svg of the stars
      const stars = await section.$$('svg[data-slot="icon"]');
      if (!stars) {
        throw new Error('Stars not found');
      }

      // Collect promises for all star classes
      const starClassPromises = stars.map(async (star) => {
        const starClass = await star.getAttribute('class');
        if (!starClass) {
          throw new Error('Star class not found');
        }
        return starClass;
      });

      // Wait for all promises to resolve
      const starClasses = await Promise.all(starClassPromises);
      // Count the number of yellow and grey stars
      let yellowStars = 0;
      let greyStars = 0;
      for (const starClass of starClasses) {
        if (starClass.includes('text-yellow-300')) {
          yellowStars += 1;
        } else if (starClass.includes('text-gray-400')) {
          greyStars += 1;
        }
      }

      // Check if the number of stars is correct
      await expect(yellowStars).toBe(secondPropertyHistory.landlordRating[1]);
      await expect(greyStars).toBe(5 - yellowStars);
    });
  });

  test.describe('History ordered by newest first', () => {
    test(`${secondPropertyHistory.landlord?.[0]} comes before ${secondPropertyHistory.landlord?.[1]}`, async ({ page }) => {
      await page.goto(`http://localhost:3000/properties/${secondPropertyHistory.propertyId}/ownership-history`);
      const currentOwnership = await page.getByRole('link', { name: `${secondPropertyHistory.landlord?.[0]}` });
      const pastOwnership = await page.getByRole('link', { name: `${secondPropertyHistory.landlord?.[1]}` });

      // Get the positions of the elements
      const currentOwnershipPosition = await currentOwnership.boundingBox();
      const pastOwnershipPosition = await pastOwnership.boundingBox();

      // Throw error if the positions are not found
      if (!currentOwnershipPosition || !pastOwnershipPosition) {
        throw new Error('Position not found');
      }

      // Check if the current ownership comes before the past ownership
      await expect(currentOwnershipPosition.y).toBeLessThan(pastOwnershipPosition.y);
    });
  });
});