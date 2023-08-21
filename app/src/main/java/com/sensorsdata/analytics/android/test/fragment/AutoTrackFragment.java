//package com.sensorsdata.analytics.android.test.fragment;
//
//import android.content.Intent;
//import android.content.SharedPreferences;
//import android.os.Bundle;
//import android.support.annotation.NonNull;
//import android.support.annotation.Nullable;
//import android.support.v4.app.Fragment;
//import android.util.Log;
//import android.view.LayoutInflater;
//import android.view.View;
//import android.view.ViewGroup;
//import android.widget.AdapterView;
//import android.widget.ArrayAdapter;
//import android.widget.CheckBox;
//import android.widget.CompoundButton;
//import android.widget.ListView;
//import android.widget.Spinner;
//import android.widget.TextView;
//
//import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
//import com.sensorsdata.analytics.android.test.R;
//import com.sensorsdata.analytics.android.test.activity.AutoTrackActivity;
//import com.sensorsdata.analytics.android.test.utils.AutoTrack;
//import com.sensorsdata.analytics.android.test.utils.Common;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import iflytek.com.mylibrary.TestDialogExt;
//
//public class AutoTrackFragment extends Fragment implements View.OnClickListener, AdapterView.OnItemClickListener, CompoundButton.OnCheckedChangeListener, AdapterView.OnItemSelectedListener {
//    private AutoTrack autoTrack=new AutoTrack();
//
//    private ListView listView;
//    private CheckBox appStart;
//    private CheckBox appClick;
//    private CheckBox appViewScreen;
//    private CheckBox appEnd;
//
//    String[] strArr=new String[]{"开启全埋点(过时方法)","开启全埋点enable(List)","关闭埋点disable(List)","忽略埋点ignore(List)"};
//
////    private AutoTrackEventType[] eventList={AutoTrackEventType.APP_START,AutoTrackEventType.APP_CLICK,AutoTrackEventType.APP_VIEW_SCREEN,AutoTrackEventType.APP_END};
//    private String[] eventList_int={"1:appstart","2:append","4:appclick","8:appviewscreen"};
//
//    private TextView textView_getAuto;
//
//    public SharedPreferences sp;
//    public SharedPreferences.Editor editor;
//    private Spinner mSpinner;
//    private String[] spinnerItems={"enable","disable","ignore"};
//
//    public String spinnerList_enable="enableList";
//    public String spinnerList_disable="disableList";
//    public String spinnerList_ignore="ignoreList";
//    private TextView textView_isAuto;
//    private Spinner spinnerDisable;
//    private Spinner spinnerIgnore;
//    private TextView textView_isAuto_int;
//    private Spinner spinnerInt;
//
//    @Nullable
//    @Override
//    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
//        View view = inflater.inflate(R.layout.fragment_auto_track, container, false);
//
//        //初始化复选框
//        appStart=(CheckBox)view.findViewById(R.id.aa);
//        appStart.setOnCheckedChangeListener(this);
//        appClick=(CheckBox)view.findViewById(R.id.bb);
//        appClick.setOnCheckedChangeListener(this);
//        appViewScreen=(CheckBox)view.findViewById(R.id.cc);
//        appViewScreen.setOnCheckedChangeListener(this);
//        appEnd=(CheckBox)view.findViewById(R.id.dd);
//        appEnd.setOnCheckedChangeListener(this);
//
//        //初始化listview
//        listView=view.findViewById(R.id.lv_auto);
//        initListView();
//        //初始化最上面spinner
//        mSpinner=(Spinner) view.findViewById(R.id.spinner_method);
//        initSpinner();
//
//        //初始化按钮
//        view.findViewById(R.id.btn_getAuto).setOnClickListener(this);
//        view.findViewById(R.id.btn_jumpA).setOnClickListener(this);
////        view.findViewById(R.id.btn_jumpF).setOnClickListener(this);
//        view.findViewById(R.id.btn_isAuto).setOnClickListener(this);
//        view.findViewById(R.id.btn_disable).setOnClickListener(this);
//        view.findViewById(R.id.btn_ignore).setOnClickListener(this);
//        view.findViewById(R.id.btn_isAuto_int).setOnClickListener(this);
//        view.findViewById(R.id.btn_error).setOnClickListener(this);
//        view.findViewById(R.id.btn_clearRefer).setOnClickListener(this);
//
//        //初始化textview
//        textView_getAuto=view.findViewById(R.id.tv_getAuto);
//        textView_isAuto=view.findViewById(R.id.tv_isAuto);
//        textView_isAuto_int=view.findViewById(R.id.tv_isAuto_int);
//
//        //初始化复选框
//        getAndSetCheckBox(spinnerList_enable);
//
//        //初始化下面两个spinner
//        spinnerDisable=(Spinner) view.findViewById(R.id.spinner_disable);
//        ArrayAdapter spinnerAdapter1=new ArrayAdapter<>(this.getContext(), R.layout.item_select_auto,eventList);
//        spinnerAdapter1.setDropDownViewResource(R.layout.item_select_auto);
//        spinnerDisable.setAdapter(spinnerAdapter1);
//
//        spinnerIgnore=(Spinner) view.findViewById(R.id.spinner_ingore);
//        ArrayAdapter spinnerAdapter2=new ArrayAdapter<>(this.getContext(), R.layout.item_select_auto,eventList);
//        spinnerAdapter2.setDropDownViewResource(R.layout.item_select_auto);
//        spinnerIgnore.setAdapter(spinnerAdapter2);
//
//
//        spinnerInt=(Spinner) view.findViewById(R.id.spinner_int);
//        ArrayAdapter spinnerAdapter3=new ArrayAdapter<>(this.getContext(), R.layout.item_select_auto,eventList_int);
//        spinnerAdapter3.setDropDownViewResource(R.layout.item_select_auto);
//        spinnerInt.setAdapter(spinnerAdapter3);
//
//        //lambda 测试
//        view.findViewById(R.id.lambda_1).setOnClickListener(test::lambda);  //静态 lambda 引用
//        view.findViewById(R.id.lambda_2).setOnClickListener(new test2()::click);  //动态 lambda 引用
//        view.findViewById(R.id.lambda_3).setOnClickListener(v -> {
//
//        });  //常规匿名类 lambda 引用
//
//        view.findViewById(R.id.jar_plugin).setOnClickListener(this);
//
//        return view;
//    }
//
//
//
//    public static class test{
//        public static void lambda(View v){
//        }
//    }
//
//    public class test2{
//        public void click(View v){
//        }
//    }
//
//
//    //初始化spinner
//    private void initSpinner(){
//        ArrayAdapter spinnerAdapter=new ArrayAdapter<>(this.getContext(), R.layout.item_select,spinnerItems);
//        spinnerAdapter.setDropDownViewResource(R.layout.item_select);
//        mSpinner.setAdapter(spinnerAdapter);
//        //点击响应事件
//        mSpinner.setOnItemSelectedListener(this);
//    }
//
//
//    //初始化listview
//    public void initListView(){
//        ArrayAdapter<String> adapter=new ArrayAdapter<String>(this.getContext(),android.R.layout.simple_list_item_1,strArr);
//        listView.setAdapter(adapter);
//        listView.setOnItemClickListener(this);
//    }
//
//
//    //哪些事件开启了全埋点，并返回开启埋点事件列表
//    public List getAutoEventTypeList(){
//        List tmpList=new ArrayList();
//        for(AutoTrackEventType i:eventList){
//            Object isIgnore = autoTrack.isEventTypeIgnore_eventType(i);
//            if (!(boolean)isIgnore){
//                tmpList.add(i.toString());
//            }
//        }
//        return tmpList;
//    }
//
//
//    @Override
//    public void onClick(View v) {
//        int pos1=spinnerDisable.getSelectedItemPosition();
//        AutoTrackEventType disableSelected = eventList[pos1];
//        int pos2=spinnerIgnore.getSelectedItemPosition();
//        AutoTrackEventType ignoreSelected = eventList[pos2];
//        int pos3=spinnerInt.getSelectedItemPosition();
//
//        switch (v.getId()){
//            case R.id.btn_getAuto:
//                //当前开启埋点的事件
//                String AutoList = getAutoEventTypeList().toString();
//                textView_getAuto.setText(AutoList);
//                break;
//
//            case R.id.btn_jumpA:
//                //跳转到activity
//                Intent intent=new Intent(getActivity(), AutoTrackActivity.class);
//                startActivity(intent);
//                break;
//
//            case R.id.btn_isAuto:
//                Object result = autoTrack.isAutoTrack();
//                textView_isAuto.setText(result.toString());
//                break;
//
//            case R.id.btn_disable:
//                autoTrack.disableAuto(disableSelected);
//                break;
//
//            case R.id.btn_ignore:
//                autoTrack.ignoreAuto(ignoreSelected);
//                break;
//
//            case R.id.btn_isAuto_int:
//                Object getResult = autoTrack.isEventTypeIgnore_int((int) Math.pow(2,pos3));
//                textView_isAuto_int.setText(getResult.toString());
//                break;
//
//            case R.id.btn_error:
//                SensorsDataAPI.sharedInstance().setSessionIntervalTime(-2);
//                break;
//
//            case R.id.btn_clearRefer:
//                SensorsDataAPI.sharedInstance().clearReferrerWhenAppEnd();
//                break;
//
//            case R.id.jar_plugin:
//                TestDialogExt.showDialog(this.getContext());
//                break;
//
//            default:
//                break;
//        }
//    }
//
//    //获取复选框的勾选状态并返回list，状态存到sp中
//    public List<AutoTrackEventType>  getSelectedEventType(String spName){
//        //初始化SP
//        sp=this.getContext().getSharedPreferences(spName,0);
//        editor=sp.edit();
//
//        List<AutoTrackEventType> eventTypeList=new ArrayList<>();
//        if (appStart.isChecked()){
//            eventTypeList.add(AutoTrackEventType.APP_START);
//            editor.putBoolean("bool1",true);
//        }else{
//            editor.putBoolean("bool1",false);
//        }
//        if(appClick.isChecked()){
//            eventTypeList.add(AutoTrackEventType.APP_CLICK);
//            editor.putBoolean("bool2",true);
//        }else {
//            editor.putBoolean("bool2",false);
//        }
//        if(appViewScreen.isChecked()){
//            eventTypeList.add(AutoTrackEventType.APP_VIEW_SCREEN);
//            editor.putBoolean("bool3",true);
//        }else {
//            editor.putBoolean("bool3",false);
//        }
//        if (appEnd.isChecked()){
//            eventTypeList.add(AutoTrackEventType.APP_END);
//            editor.putBoolean("bool4",true);
//        }else {
//            editor.putBoolean("bool4",false);
//        }
//        editor.commit();
//
//        return eventTypeList;
//    }
//
//    //过时方法Autotrack设置开启事件埋点(过时方法只开三个方法)
//    public void setAllEnable(){
//        sp=this.getContext().getSharedPreferences(spinnerList_enable,0);
//        editor=sp.edit();
//        editor.putBoolean("bool1",true);
//        editor.putBoolean("bool2",false);
//        editor.putBoolean("bool3",true);
//        editor.putBoolean("bool4",true);
//        editor.commit();
//        appStart.setChecked(true);
//        appViewScreen.setChecked(true);
//        appEnd.setChecked(true);
//
//    }
//
//
//    //从sp中读取复选框状态
//    public void getAndSetCheckBox(String spName){
//        sp=this.getContext().getSharedPreferences(spName,0);
//        appStart.setChecked(sp.getBoolean("bool1",false));
//        appClick.setChecked(sp.getBoolean("bool2",false));
//        appViewScreen.setChecked(sp.getBoolean("bool3",false));
//        appEnd.setChecked(sp.getBoolean("bool4",false));
//
//    }
//
//
//    @Override
//    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
//        //获取当前spinner选中内容
//        String getSpinner = mSpinner.getSelectedItem().toString();
//
//        switch (strArr[position]){
//            case "开启全埋点enable(List)":
//                if ("enable".equals(getSpinner)){
//                    Common.toast(this.getContext(),"开启全埋点");
//                    autoTrack.enableAuto(getSelectedEventType(spinnerList_enable));
//                }else {
//                    Common.toast(this.getContext(),"请切换到enable列表，选择开启全埋点方法");
//                }
//                break;
//
//            case "开启全埋点(过时方法)":
//                //只能开启启动、浏览和退出三个事件
//                Common.toast(this.getContext(),"过时方法开启所有全埋点");
//                autoTrack.enableAuto_old();
//                mSpinner.setSelection(0,true);
//                setAllEnable();
//                break;
//
//            case "关闭埋点disable(List)":
//                if ("disable".equals(getSpinner)){
//                    Common.toast(this.getContext(),"使用disable关闭开启的埋点");
//                    autoTrack.disableAuto(getSelectedEventType(spinnerList_disable));
//                }else {
//                    Common.toast(this.getContext(),"请切换到disable列表，选择要关闭的方法");
//                }
//                break;
//
//            case "忽略埋点ignore(List)":
//                if ("ignore".equals(getSpinner)){
//                    Common.toast(this.getContext(),"使用ignore关闭开启的埋点");
//                    autoTrack.ignoreAuto(getSelectedEventType(spinnerList_ignore));
//                }else {
//                    Common.toast(this.getContext(),"请切换到ignore列表，选择要关闭的方法");
//                }
//                break;
//
//
//             default:
//                 break;
//
//        }
//    }
//
//
//    @Override
//    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
//        //复选框改变的监听
//
//    }
//
//    @Override
//    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
////        Common.toast(this.getContext(),"选择了["+spinnerItems[position]+"]");
//
//        switch (spinnerItems[position]){
//            case "enable":
//                getAndSetCheckBox(spinnerList_enable);
//                break;
//
//            case "disable":
//                getAndSetCheckBox(spinnerList_disable);
//                break;
//
//            case "ignore":
//                getAndSetCheckBox(spinnerList_ignore);
//                break;
//
//            default:
//                break;
//        }
//
//    }
//
//    @Override
//    public void onNothingSelected(AdapterView<?> parent) {
//
//    }
//}
