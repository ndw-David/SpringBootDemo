package com.buba.util;


import java.util.BitSet;

public class BitsetUtil {
	public static BitSet toBitSet(String s) {
		int len = s.length();
		BitSet bs = new BitSet(len);
		for (int i = 0; i < len; i++) {
			if (s.charAt(i) == '1')
				bs.set(i);
		}
		return bs;
	}
	
	public static String toString(BitSet bs) {
		int len = bs.length();
		StringBuffer buf = new StringBuffer(len);
		for (int i = 0; i < len; i++)
			buf.append(bs.get(i) ? '1' : '0');
		return buf.toString();
	}
	
    public static void main(String[] args) {
    	BitSet bs = toBitSet("01010101010111110");
    	System.out.println(toString(bs));
	}
}
