package com.sensorsdata.analytics.android.test.utils;

import android.content.Context;
import android.content.SharedPreferences;

import com.sensorsdata.analytics.android.sdk.plugin.encrypt.StorePlugin;


/**
 * 对本地 SP 自定义加密插件
 */
public class SPPlugin implements StorePlugin {

    SharedPreferences mSP;

    public SPPlugin(Context context) {
        mSP = context.getSharedPreferences("mysp", Context.MODE_PRIVATE);
    }

    @Override
    public void upgrade(StorePlugin oldPlugin) {

    }

    @Override
    public void setString(String key, String value) {
        mSP.edit().putString(key, KaisaUtil.encryptKaisa(value)).apply();

    }

    @Override
    public void setBool(String key, boolean value) {
        mSP.edit().putString(key, KaisaUtil.encryptKaisa(String.valueOf(value))).apply();
    }

    @Override
    public void setInteger(String key, int value) {
        mSP.edit().putString(key, KaisaUtil.encryptKaisa(String.valueOf(value))).apply();
    }

    @Override
    public void setFloat(String key, float value) {
        mSP.edit().putString(key, KaisaUtil.encryptKaisa(String.valueOf(value))).apply();
    }

    @Override
    public void setLong(String key, long value) {
        mSP.edit().putString(key, KaisaUtil.encryptKaisa(String.valueOf(value))).apply();
    }

    @Override
    public String getString(String key) {
        String value = mSP.getString(key, null);
        if (value != null) {
            return KaisaUtil.decryptKaiser(value);
        }
        return null;
    }

    @Override
    public Boolean getBool(String key) {
        if (isExists(key)) {
            return Boolean.parseBoolean(getString(key));
        }
        return null;
    }

    @Override
    public Integer getInteger(String key) {
        if (isExists(key)) {
            return Integer.parseInt(getString(key));
        }
        return null;
    }

    @Override
    public Float getFloat(String key) {
        if (isExists(key)) {
            return Float.parseFloat(getString(key));
        }
        return null;
    }

    @Override
    public Long getLong(String key) {
        if (isExists(key)) {
            return Long.parseLong(getString(key));
        }
        return null;
    }

    @Override
    public void remove(String key) {
        mSP.edit().remove(key).apply();
    }

    @Override
    public boolean isExists(String key) {
        return mSP.contains(key);
    }

    @Override
    public String type() {
        return "Kaisa";
    }
}
