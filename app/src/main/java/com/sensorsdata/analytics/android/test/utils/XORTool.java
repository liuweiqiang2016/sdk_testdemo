package com.sensorsdata.analytics.android.test.utils;

public class XORTool {

    //进行位运算的值
    private static char key='m';
    /**
     * 利用位运算异或进行字符串加密及解密,异或的特性：两次异或会还原到原始值
     * @param inStr 原值
     * @return s 转换结果
     */
    public static String xorString(String inStr){

        char[] a = inStr.toCharArray();
        for (int i = 0; i < a.length; i++){
            a[i] = (char) (a[i] ^ key);
        }
        String s = new String(a);
        return s;
    }

}
