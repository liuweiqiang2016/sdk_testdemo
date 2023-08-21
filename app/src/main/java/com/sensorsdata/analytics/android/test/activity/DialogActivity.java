package com.sensorsdata.analytics.android.test.activity;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.utils.Common;

/*
* Dialog 类型的 Activity
* */
public class DialogActivity extends AppCompatActivity implements View.OnClickListener  {

    private Button btn_sure;
    private Button btn_cancel;
    private TextView textView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dialog);
        initViews();//初始化控件
        initEvents();//初始化事件
    }

    private void initViews(){

        btn_sure=findViewById(R.id.pop_sure);
        btn_cancel=findViewById(R.id.pop_cancel);
        textView=findViewById(R.id.pop_tv);
        textView.setText("您可以自由的定制自己的弹窗，使弹窗 UI 与您的业务更加契合，快来动手试试吧！");
    }

    private void initEvents(){
        btn_sure.setOnClickListener(this);
        btn_cancel.setOnClickListener(this);
    }


    @Override
    public void onClick(View view) {
        if (view.getId()==R.id.pop_sure){
            Common.toast(this,"确定了...");
            finish();
        }
        if (view.getId()==R.id.pop_cancel){
            Common.toast(this,"取消了...");
            finish();
        }
    }


    //Activity销毁时，终止该Activity的进程
    @Override
    protected void onDestroy() {
        super.onDestroy();
//        android.os.Process.killProcess(android.os.Process.myPid());
    }

    @Override
    protected void onPause() {
        super.onPause();
        System.out.println("进入后台....");
    }

}
