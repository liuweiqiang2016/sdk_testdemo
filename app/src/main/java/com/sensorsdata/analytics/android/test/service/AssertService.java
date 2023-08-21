package com.sensorsdata.analytics.android.test.service;

import android.app.IntentService;
import android.content.Intent;
import android.content.Context;

import com.sensorsdata.analytics.android.test.utils.Common;

/**
 * An {@link IntentService} subclass for handling asynchronous task requests in
 * a service on a separate handler thread.
 * 对事件异常属性校验的service，防止耗时引起的应用异常
 * <p>
 * <p>
 * TODO: Customize class - update intent actions, extra parameters and static
 * helper methods.
 */
public class AssertService extends IntentService {


    public AssertService() {
        super("AssertService");
    }

    @Override
    protected void onHandleIntent(Intent intent) {

        if (intent != null) {

            Common.assertEventProperties(this,intent.getStringExtra("eventName"),intent.getStringExtra("properties"));
//            MyFilter myFilter= (MyFilter) intent.getSerializableExtra("filter");
//            SAPropertyFilter filter= myFilter.getFilter();
//            if (filter != null){
//                Common.assertProperties(filter);
//            }
        }
    }

}