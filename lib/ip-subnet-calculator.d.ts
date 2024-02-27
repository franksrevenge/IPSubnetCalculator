/**
 * @author Aleksi Asikainen
 * @link https://github.com/salieri/IPSubnetCalculator
 *
 * IpSubnetCalculator 2.0.0
 *
 * Copyright (c) 2013-2024, Aleksi Asikainen
 * All rights reserved.
 *
 * Released under MIT License
 * https://opensource.org/licenses/MIT
 *
 * Designed for:
 *
 *    1) Calculating optimal and exact subnet masks for an
 *       unrestricted range of IP addresses.
 *
 *       E.g. range `10.0.1.255 - 10.0.3.255` should result in:
 *
 *           `10.0.1.255/32`
 *           `10.0.2.0/24`
 *           `10.0.3.0/24`
 *
 *    2) Calculating subnets from an IP and bitmask size
 *
 *    3) Calculating subnets and bitmask sizes from an IP and subnet mask
 *
 *
 * Use `calculate()`, `calculateSubnetMask()`, and `calculateCIDRPrefix()` for easy access.
 *
 */
export type IPAny = string | number;
export type IPString = string;
export type IPNumber = number;
export type BitCount = number;
export interface SubnetAnalysis {
    ipLow: IPNumber;
    ipLowStr: IPString;
    ipHigh: IPNumber;
    ipHighStr: IPString;
    prefixMask: IPNumber;
    prefixMaskStr: IPString;
    prefixSize: BitCount;
    invertedMask: IPNumber;
    invertedMaskStr: IPString;
    invertedMaskSize: BitCount;
}
/**
 * Creates a bitmask with maskSize leftmost bits set to one
 *
 * @param {int} prefixSize Number of bits to be set
 * @return {int} Returns the bitmask
 * @private
 */
export declare const getPrefixMask: (prefixSize: BitCount) => IPNumber;
/**
 * Creates a bitmask with maskSize rightmost bits set to one
 *
 * @param {int} maskSize Number of bits to be set
 * @return {int} Returns the bitmask
 * @private
 */
export declare const getMask: (maskSize: BitCount) => IPNumber;
/**
 * Test whether string is an IP address
 * @param {string} ip
 * @returns {boolean}
 * @public
 */
export declare const isIp: (ip: IPString) => boolean;
/**
 * Test whether number is an IP address
 * @param {number} ipNum
 * @returns {boolean}
 * @public
 */
export declare const isDecimalIp: (ipNum: IPNumber) => boolean;
/**
 * Converts string formatted IPs to decimal representation
 *
 * @link http://javascript.about.com/library/blipconvert.htm
 * @param {string|number} ipString IP address in string format. If a decimal representation given, it is returned unmodified.
 * @return {int} Returns the IP address in decimal format
 * @throws {Error} Throws an error, if `ipString` does not contain an IP address.
 * @private
 */
export declare const toDecimal: (ipString: IPString | IPNumber) => IPNumber;
/**
 * Converts decimal IPs to string representation
 *
 * @link http://javascript.about.com/library/blipconvert.htm
 * @param {int} ipNum IP address in decimal format. If a string representation is given, it is returned unmodified.
 * @return {string} Returns the IP address in string format
 * @throws {Error} Throws an error, if `ipNum` is out of range, not a decimal, or not a number
 * @private
 */
export declare const toString: (ipNum: IPNumber | IPString) => IPString;
/**
 * Calculates details of a CIDR subnet
 *
 * @param {int} ipNum Decimal IP address
 * @param {int} prefixSize Subnet mask size in bits
 * @return {object} Returns an object with the following fields:
 *
 * ipLow - Decimal representation of the lowest IP address in the subnet
 * ipLowStr - String representation of the lowest IP address in the subnet
 * ipHigh - Decimal representation of the highest IP address in the subnet
 * ipHighStr - String representation of the highest IP address in the subnet
 * prefixMask - Bitmask matching prefixSize
 * prefixMaskStr - String / IP representation of the bitmask
 * prefixSize - Size of the prefix
 * invertedMask - Bitmask matching the inverted subnet mask
 * invertedMaskStr - String / IP representation of the inverted mask
 * invertedMaskSize - Number of relevant bits in the inverted mask
 * @private
 */
export declare const getMaskRange: (ipNum: IPNumber, prefixSize: BitCount) => SubnetAnalysis;
/**
 * Finds the largest subnet mask that begins from ipNum and does not
 * exceed ipEndNum.
 *
 * @param {int} ipNum IP start point (inclusive)
 * @param {int} ipEndNum IP end point (inclusive)
 * @return {object|null} Returns `null` on failure, otherwise an object with the following fields:
 *
 * ipLow - Decimal representation of the lowest IP address in the subnet
 * ipLowStr - String representation of the lowest IP address in the subnet
 * ipHigh - Decimal representation of the highest IP address in the subnet
 * ipHighStr - String representation of the highest IP address in the subnet
 * prefixMask - Bitmask matching prefixSize
 * prefixMaskStr - String / IP representation of the bitmask
 * prefixSize - Size of the prefix
 * invertedMask - Bitmask matching the inverted subnet mask
 * invertedMaskStr - String / IP representation of the inverted mask
 * invertedMaskSize - Number of relevant bits in the inverted mask
 * @private
 */
export declare const getOptimalRange: (ipNum: IPNumber, ipEndNum: IPNumber) => SubnetAnalysis | null;
/**
 * Calculates an optimal set of IP masks for the given IP address range
 *
 * @param {string|number} ipStart Lowest IP in the range to be calculated
 * @param {string|number} ipEnd Highest IP (inclusive) in the range to be calculated
 *
 * @return The function returns `null` in case of an error. Otherwise, an array containing one or more subnet
 *         masks is returned:
 *
 * ```
 * const result = [
 *      {
 *          ipLow              : 2071689984,
 *          ipLowStr           : "123.123.123.0",
 *          ipHigh             : 2071690239,
 *          ipHighStr          : "123.123.123.255",
 *          prefixMask         : 4294967040,
 *          prefixMaskStr      : "255.255.255.0",
 *          prefixSize         : 24,
 *          invertedMask       : 255,
 *          invertedMaskStr    : "0.0.0.255",
 *          invertedMaskSize   : 8
 *      },
 *
 *      ...
 * ];
 * ```
 * @public
 */
export declare const calculate: (ipStart: IPAny, ipEnd: IPAny) => SubnetAnalysis[] | null;
/**
 * Calculates a subnet mask from CIDR prefix.
 *
 * @param {string|number} ip IP address ("2.3.4.5")
 * @param {int} prefixSize Number of relevant bits in the subnet mask (24)
 * @return {SubnetAnalysis|null} Returns null in case of an error, and a subnet data object otherwise.
 *         For details about the subnet data object, see documentation of
 *         getMaskRange()
 * @public
 */
export declare const calculateSubnetMask: (ip: IPAny, prefixSize: BitCount) => SubnetAnalysis | null;
/**
 * Calculates a CIDR prefix from subnet mask.
 *
 * @param {string|number} ip IP address ("2.3.4.5")
 * @param {string|number} subnetMask IP subnet mask ("255.255.255.0")
 * @return {SubnetAnalysis|null} Returns `null` in case of an error, and a subnet data object otherwise.
 *         For details about the subnet data object, see documentation of
 *         getMaskRange()
 * @public
 */
export declare const calculateCIDRPrefix: (ip: IPAny, subnetMask: IPAny) => SubnetAnalysis | null;
//# sourceMappingURL=ip-subnet-calculator.d.ts.map