import {filterData, sortData, searchData } from '../src/data.js';
import data from "../src/data/lol/lol.js";

describe('filterData', () => {
  it('is a function', () => {
    expect(typeof filterData).toBe('function');
  });

  it('returns an object', () => {
    expect(typeof(filterData(data.data,{tags:'Support',info:{defense:4},partype:'MP'}))).toBe('object');
  });
});

describe('sortData', () => {
  it('is a function', () => {
    expect(typeof sortData).toBe('function');
  });

  it('returns an object', () => {
    expect(typeof(sortData(data.data,'magic'))).toBe('object');
  });

  it('returns an object', () => {
    expect(typeof(sortData(data.data,'armor'))).toBe('object');
  });

  it('returns an object', () => {
    expect(typeof(sortData(data.data,'tags'))).toBe('object');
  });

  it('returns all the data', () => {
    expect(sortData(data.data,'id')).toStrictEqual(data.data);
  });

});

describe('searchData', () => {
  it('is a function', () => {
    expect(typeof searchData).toBe('function');
  });

  it('returns an object', () => {
    expect(typeof(searchData(data.data,'strong warrior'))).toBe('object');
  });

  it('returns the champion', () => {
    expect(searchData(data.data,"Akali")).toStrictEqual({Akali: data.data['Akali']});
  });
});
