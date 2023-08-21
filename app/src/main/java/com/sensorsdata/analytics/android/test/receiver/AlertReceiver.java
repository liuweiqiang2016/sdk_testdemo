package com.sensorsdata.analytics.android.test.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.IBinder;
import android.widget.Toast;

import java.util.Set;

public class AlertReceiver extends BroadcastReceiver {

    public AlertReceiver() {
        super();
    }

    @Override
    public IBinder peekService(Context myContext, Intent service) {
        return super.peekService(myContext, service);
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        Bundle bundle= intent.getExtras();
        if(bundle==null){
            Toast.makeText(context,"nothing", Toast.LENGTH_LONG).show();
        }else{
            Set<String> set=bundle.keySet();
            for(String item:set){
                System.out.println(item);
                System.out.println(".............");
            }
            Toast.makeText(context,bundle.getCharSequence("try"), Toast.LENGTH_LONG).show();

        }
    }
}
