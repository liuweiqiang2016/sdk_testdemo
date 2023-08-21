package com.sensorsdata.analytics.android.test.activity;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.Spinner;
import android.widget.Switch;

import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.utils.Common;

/*
* 选择进入哪种类型的 WebView
* */
public class H5Activity extends AppCompatActivity implements View.OnClickListener , AdapterView.OnItemSelectedListener, CompoundButton.OnCheckedChangeListener {

    private Switch sw_jellyBean,sw_safe,sw_version;
    private Button btn;
    private String[] strings={"原生WebView","腾讯X5WebView","第三方库Agent","多个WebView"};
    private String[] functions={"loadUrl","loadUrl2","postUrl","loadData","loadDataWithBaseUrl"};
    private Spinner sp_view,sp_fun;
    private ArrayAdapter<String> adapter,adapter2;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_h5);
        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true);
            actionBar.setDisplayShowHomeEnabled(true);
            actionBar.setTitle("H5 页面");
        }
        initViews();//初始化控件
        initEvents();//初始化事件
        initData();//初始化数据

//        SensorsFocusAPI.sharedInstance().enablePopup();
    }

    private void initViews(){
        sw_jellyBean=findViewById(R.id.sw_jellyBean);
        sw_safe=findViewById(R.id.sw_safe);
        sw_version=findViewById(R.id.sw_version);
        sp_view=findViewById(R.id.sp_view);
        sp_fun=findViewById(R.id.sp_fun);
        btn=findViewById(R.id.btn_h5);
    }

    private void initEvents(){
        sp_view.setOnItemSelectedListener(this);
        sp_fun.setOnItemSelectedListener(this);
        btn.setOnClickListener(this);
        sw_safe.setOnCheckedChangeListener(this);
    }

    private void  initData(){
        adapter =new ArrayAdapter<>(this,android.R.layout.simple_spinner_item,strings);
        sp_view.setAdapter(adapter);
        adapter2 =new ArrayAdapter<>(this,android.R.layout.simple_spinner_item,functions);
        sp_fun.setAdapter(adapter2);
    }

    @Override
    public void onClick(View view) {
        if (view.getId()==R.id.btn_h5){
            Intent intent=new Intent(this, ViewActivity.class);
            intent.putExtra("isSupportJellyBean",sw_jellyBean.isChecked());
            intent.putExtra("enableVerify",sw_safe.isChecked());
            intent.putExtra("isOldVersion",sw_version.isChecked());
            intent.putExtra(Common.INTENT_TYPE,strings[sp_view.getSelectedItemPosition()]);
            intent.putExtra("function",functions[sp_fun.getSelectedItemPosition()]);
            startActivity(intent);
        }

    }

    @Override
    public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {

    }

    @Override
    public void onNothingSelected(AdapterView<?> adapterView) {

    }


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            //actionbar navigation up 按钮
            case android.R.id.home:
                onBackPressed();
                break;
            default:
                break;
        }
        return true;
    }

    //此种返回方法,全埋点插件目前还未支持,v3.2.7
//    @Override
//    public boolean onSupportNavigateUp() {
//        onBackPressed();
//        return super.onSupportNavigateUp();
//    }


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

    @Override
    public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
        System.out.println("状态:"+b);

    }

    @Override
    protected void onResume() {
        super.onResume();
    }
}
