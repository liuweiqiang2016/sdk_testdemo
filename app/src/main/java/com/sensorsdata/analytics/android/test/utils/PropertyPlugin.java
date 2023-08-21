package com.sensorsdata.analytics.android.test.utils;

import android.database.CursorWindow;
import android.util.Log;

import com.sensorsdata.analytics.android.sdk.plugin.property.SAPropertyPlugin;
import com.sensorsdata.analytics.android.sdk.plugin.property.SAPropertyPluginPriority;
import com.sensorsdata.analytics.android.sdk.plugin.property.beans.SAPropertiesFetcher;
import com.sensorsdata.analytics.android.sdk.plugin.property.beans.SAPropertyFilter;

import org.json.JSONException;
import org.json.JSONObject;


public class PropertyPlugin extends SAPropertyPlugin {

    @Override
    public void properties(SAPropertiesFetcher fetcher) {
        //Log.e("SA.S", "fetcher: "+fetcher.toString() );
        //fetcher.getProperties().remove("$app_name");
//        fetcher.getProperties().remove("$app_version");
//        fetcher.getProperties().remove("$app_id");
//        fetcher.getProperties().remove("$app");
//        fetcher.getProperties().remove(null);
//        Log.e("SA.S", "properties: =======插件处理中=======");


        try {
            fetcher.getProperties().put("index","abc");
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

//    @Override
//    public boolean isMatchedWithFilter(SAPropertyFilter filter) {
//       // Log.e("SA.S", "filter: "+filter.toString() );
//
//
////        return filter.getEvent()!=null&&filter.getEvent().equals("$AppStart");
//        return filter.getEvent()!=null&&filter.getEvent().equals("$AppClick");
////        return true;
//    }

    @Override
    public SAPropertyPluginPriority priority() {
//        return super.priority();
        return SAPropertyPluginPriority.LOW;
    }
}
