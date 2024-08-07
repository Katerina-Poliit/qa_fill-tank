'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  let customer;

  beforeEach(() => {
    customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
  });

  it('should fills the tank completely when no amount is given', () => {
    fillTank(customer, 59);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1112);
  });

  it('should pours only what fits if amount exceeds tank capacity', () => {
    fillTank(customer, 59, 50);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1112);
  });

  it('should fill in only what the client can pay for', () => {
    fillTank(customer, 59, 10);
    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(2410);
  });

  it('should round the poured amount by discarding to the tenth part', () => {
    fillTank(customer, 59, 11.22);
    expect(customer.vehicle.fuelRemains).toBe(19.2);
    expect(customer.money).toBe(2339.2);
  });

  it('should does not pour if the rounded amount is less than 2 liters', () => {
    fillTank(customer, 59, 1.5);
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });

  it('should round the price of the purchased fuel'
    + 'to the nearest hundredths', () => {
    fillTank(customer, 51.234, 10.5);
    expect(customer.vehicle.fuelRemains).toBe(18.5);
    expect(customer.money).toBe(2462.04);
  });
});
