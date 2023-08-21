package com.sensorsdata.analytics.android.test.utils;


/**
 * 加密算法凯撒
 * 在密码学中，恺撒密码是一种最简单并且最广为人知的加密技术。
 * 它是一种替换加密的技术，明文中的所欲字母都在字母表上向后（或向前）按照一个固定的数目进行偏移后被替换成密文。
 * 例如：当偏移量是3的时候，所有的字母A将被替换成D，B变成E，以此类推。
 * 这个加密方法是以恺撒的名字命名的，当年恺撒曾用此方法与其将军们进行联系。
 * 原文链接：https://blog.csdn.net/theUncle/article/details/100156976
 */
public class KaisaUtil {
    //偏移量
    private static final int key=4;
    /***
     * 使用凯撒加密方式加密数据
     * @param orignal 原文
     * @return 加密后的字符
     */
    public static String encryptKaisa(String orignal) {
        //将字符串转换为数组
        char[] chars = orignal.toCharArray();
        StringBuffer buffer = new StringBuffer();
        //遍历数组
        for(char aChar : chars) {
            //获取字符的ASCII编码
            int asciiCode = aChar;
            //偏移数据
            asciiCode += key;
            //将偏移后的数据转为字符
            char result = (char)asciiCode;
            //拼接数据
            buffer.append(result);
        }
        return buffer.toString();
    }

    /**
     * 使用凯撒加密方式解密数据
     *
     * @param encryptedData :密文
     * @return : 源数据
     */
    public static String decryptKaiser(String encryptedData) {
        // 将字符串转为字符数组
        char[] chars = encryptedData.toCharArray();
        StringBuilder sb = new StringBuilder();
        // 遍历数组
        for (char aChar : chars) {
            // 获取字符的ASCII编码
            int asciiCode = aChar;
            // 偏移数据
            asciiCode -= key;
            // 将偏移后的数据转为字符
            char result = (char) asciiCode;
            // 拼接数据
            sb.append(result);
        }

        return sb.toString();
    }

}