package com.sensorsdata.analytics.android.test.activity;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.KeyEvent;

import com.sensorsdata.analytics.android.test.R;


public class TVActivity extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tv);

    }

    //终端输入 adb shell input keyevent 23 来模拟遥控器按确定键点击,链接:https://doc.sensorsdata.cn/pages/viewpage.action?pageId=39303033
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_DPAD_CENTER) {
            android.view.View v = getWindow().getDecorView().findFocus();
            Log.e("rqy", "TVActivity-onKeyDown-" + v);
        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        if (event.getKeyCode() == KeyEvent.KEYCODE_DPAD_CENTER && event.getAction() == KeyEvent.ACTION_DOWN) {
            android.view.View v = getWindow().getDecorView().findFocus();
            Log.e("rqy", "TVActivity-dispatchKeyEvent-" + v);
        }
        return false;
        //return 453;
    }

//    public void trackViewOnClick(Activity activity, KeyEvent event){
//        if (event.getKeyCode() == KeyEvent.KEYCODE_DPAD_CENTER && event.getAction() == KeyEvent.ACTION_DOWN) {
//            android.view.View v = activity.getWindow().getDecorView().findFocus();
//            Log.e("rqy", "MainActivity-dispatchKeyEvent-" + v);
//        }
//    }

}
