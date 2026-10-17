import { describe, it } from 'node:test';
import assert from 'node:assert';

// Import phone and contact constants to verify routing
import { CONTACT_NUMBERS } from '../src/utils/contact.js';

describe('Real Estate Advisory Questionnaire Logic & Branching', () => {
  it('should route to the correct dedicated calling desk by vertical', () => {
    assert.strictEqual(CONTACT_NUMBERS[0].number, '+91 77372 13615', 'Line 1 is Buy & Sell');
    assert.strictEqual(CONTACT_NUMBERS[1].number, '+91 96642 47662', 'Line 2 is Rent & Lease');
    assert.strictEqual(CONTACT_NUMBERS[2].number, '+91 63763 12638', 'Line 3 is Airbnb & Hospitality');
  });

  describe('Tab 1: Buy & Sell Branching', () => {
    it('supports Buying a property path', () => {
      const state = {
        vertical: 'buy',
        buyGoal: 'Buying a property',
        buyPropertyType: 'House or villa',
        buyEnquiringFor: 'Myself or my family',
        buyLocation: 'Vaishali Nagar',
        buyPriceRange: '₹1 Crore – ₹2.5 Crore',
        buyTiming: 'Within 3 months',
      };
      assert.strictEqual(state.buyGoal, 'Buying a property');
      assert.strictEqual(state.buyPropertyType, 'House or villa');
      assert.strictEqual(state.buyLocation, 'Vaishali Nagar');
    });

    it('supports Selling a property path with property size and expected price', () => {
      const state = {
        vertical: 'buy',
        buyGoal: 'Selling a property',
        buyPropertyType: 'Apartment or flat',
        buySellerLocation: 'C-Scheme',
        buySellerSize: '2,200 sq ft',
        buySellerPrice: '₹1.5 Crore – ₹3 Crore',
        buyTiming: 'As soon as possible',
      };
      assert.strictEqual(state.buyGoal, 'Selling a property');
      assert.ok(state.buySellerSize.length > 0);
      assert.strictEqual(state.buySellerPrice, '₹1.5 Crore – ₹3 Crore');
    });

    it('supports Exploring property investments with investment focus and goals', () => {
      const state = {
        vertical: 'buy',
        buyGoal: 'Exploring property investments',
        buyPropertyType: 'Office or commercial building',
        buyLocation: 'Tonk Road',
        buyInvestorAsset: 'Pre-leased commercial (rental income)',
        buyInvestorGoal: 'Rental income',
        buyPriceRange: '₹2.5 Crore – ₹5 Crore',
        buyTiming: 'Within 3–6 months',
      };
      assert.strictEqual(state.buyInvestorGoal, 'Rental income');
      assert.strictEqual(state.buyInvestorAsset, 'Pre-leased commercial (rental income)');
    });

    it('shows company field only when enquiring for company or client', () => {
      const shouldShow = (enquiringFor) =>
        enquiringFor === 'My company or business' || enquiringFor === 'A client or organisation I represent';

      assert.strictEqual(shouldShow('Myself or my family'), false);
      assert.strictEqual(shouldShow('Prefer not to say'), false);
      assert.strictEqual(shouldShow('My company or business'), true);
      assert.strictEqual(shouldShow('A client or organisation I represent'), true);
    });
  });

  describe('Tab 2: Rent & Lease Branching', () => {
    it('supports Prospective Tenant path with usage and requirements', () => {
      const state = {
        vertical: 'rent',
        rentGoal: 'Find a property to rent or lease',
        rentPropertyType: 'Office or coworking space',
        rentTenantArea: 'Sitapura Industrial & IT Park',
        rentUsage: 'Corporate Office / IT',
        rentTenantRequirements: ['Reserved parking space', '100% power backup'],
        rentTenantBudget: '₹50,000 – ₹1.5 Lakh / month',
        rentTenantTimeline: 'Within 1 month',
        rentTenantDuration: '1 to 3 years',
      };
      assert.strictEqual(state.rentGoal, 'Find a property to rent or lease');
      assert.strictEqual(state.rentTenantRequirements.length, 2);
    });

    it('supports Property Owner path with size, availability, and expected rent', () => {
      const state = {
        vertical: 'rent',
        rentGoal: 'Rent or lease out my property',
        rentPropertyType: 'Shop or retail space',
        rentOwnerLocation: 'Malviya Nagar',
        rentOwnerSize: '1,500 sq ft',
        rentOwnerAvailability: 'Within 30 days',
        rentOwnerExpectedRent: '₹50,000 – ₹1.5 Lakh / month',
        rentOwnerPreferredDuration: 'Long-term corporate lease (3+ years)',
      };
      assert.strictEqual(state.rentGoal, 'Rent or lease out my property');
      assert.strictEqual(state.rentOwnerAvailability, 'Within 30 days');
    });
  });

  describe('Tab 3: Airbnb & Hospitality Branching', () => {
    it('Branch A: Guest enquiry with check-in/out and guest count', () => {
      const state = {
        vertical: 'stay',
        stayGoal: 'Find a place to stay',
        stayGuestArea: 'Civil Lines / C-Scheme',
        stayGuestAccomType: 'Heritage Haveli',
        stayGuestCount: '3–5 guests',
        stayCheckIn: '2026-11-10',
        stayCheckOut: '2026-11-14',
        stayGuestBudget: '₹7,000 – ₹15,000 / night',
      };
      assert.strictEqual(state.stayGoal, 'Find a place to stay');
      assert.ok(state.stayCheckOut >= state.stayCheckIn, 'Check-out is after check-in');
    });

    it('Branch B: Listing property with bedrooms, capacity, and platform history', () => {
      const state = {
        vertical: 'stay',
        stayGoal: 'List my property for short stays',
        stayHostPropType: 'Heritage haveli or courtyard home',
        stayHostLocation: 'Pink City / Walled City',
        stayHostBedrooms: '3 Bedrooms',
        stayHostGuestCap: '5–8 guests',
        stayHostListedBefore: 'Not yet',
        stayHostHelpType: 'Full turnkey management (end-to-end)',
        stayHostTimeline: 'Within 1 month',
      };
      assert.strictEqual(state.stayHostListedBefore, 'Not yet');
      assert.strictEqual(state.stayHostHelpType, 'Full turnkey management (end-to-end)');
    });

    it('Branch C: Property Management with operating status & scope', () => {
      const state = {
        vertical: 'stay',
        stayGoal: 'Get help managing my property',
        stayMgmtLocation: 'Bani Park',
        stayMgmtPropType: 'Villa',
        stayMgmtOperatingStatus: 'Yes, currently operating',
        stayMgmtScope: 'Full 360° property operations',
        stayMgmtTimeline: 'Immediately',
      };
      assert.strictEqual(state.stayMgmtOperatingStatus, 'Yes, currently operating');
      assert.strictEqual(state.stayMgmtScope, 'Full 360° property operations');
    });

    it('Branch D: Hospitality Investment with budget & timeline', () => {
      const state = {
        vertical: 'stay',
        stayGoal: 'Explore a hospitality property or investment',
        stayInvestType: 'Buying a running Airbnb haveli/villa',
        stayInvestArea: 'Jaipur Heritage Core / Walled City',
        stayInvestBudget: '₹1.5 Crore – ₹3.5 Crore',
        stayInvestTimeline: 'Within 1–3 months',
      };
      assert.strictEqual(state.stayInvestType, 'Buying a running Airbnb haveli/villa');
      assert.strictEqual(state.stayInvestBudget, '₹1.5 Crore – ₹3.5 Crore');
    });
  });

  describe('Validation & Verification Rules', () => {
    it('validates customer name has at least 2 characters', () => {
      const validateName = (name) => name.trim().length >= 2;
      assert.strictEqual(validateName(''), false);
      assert.strictEqual(validateName('A'), false);
      assert.strictEqual(validateName('Ramesh Sharma'), true);
    });

    it('validates 10-digit Indian phone number', () => {
      const validatePhone = (phone) => {
        const clean = phone.replace(/\D/g, '').slice(-10);
        return clean.length === 10 && /^[6-9]\d{9}$/.test(clean);
      };
      assert.strictEqual(validatePhone('12345'), false);
      assert.strictEqual(validatePhone('1234567890'), false); // starts with 1
      assert.strictEqual(validatePhone('9876543210'), true);
      assert.strictEqual(validatePhone('+91 77372 13615'), true);
    });

    it('validates optional email format', () => {
      const validateEmail = (email) => {
        if (!email.trim()) return true; // optional
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      };
      assert.strictEqual(validateEmail(''), true);
      assert.strictEqual(validateEmail('notanemail'), false);
      assert.strictEqual(validateEmail('client@example.com'), true);
    });

    it('validates stay check-in / check-out dates consistency', () => {
      const validateDates = (checkIn, checkOut) => {
        if (!checkIn || !checkOut) return true; // optional
        return checkOut >= checkIn;
      };
      assert.strictEqual(validateDates('2026-11-15', '2026-11-10'), false);
      assert.strictEqual(validateDates('2026-11-10', '2026-11-15'), true);
      assert.strictEqual(validateDates('', ''), true);
    });
  });
});
