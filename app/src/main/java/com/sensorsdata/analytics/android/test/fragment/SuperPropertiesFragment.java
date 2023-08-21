package com.sensorsdata.analytics.android.test.fragment;


import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;

import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.sdk.SensorsDataDynamicSuperProperties;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.utils.Common;
import com.sensorsdata.analytics.android.test.utils.FileController;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class SuperPropertiesFragment extends Fragment implements View.OnClickListener, AdapterView.OnItemSelectedListener{

    private  View view;
    private Button btn_getsuper,btn_deleteall,btn_setsuper,btn_delete;
    private Spinner sp3;
    private ArrayAdapter<String> adapter3;
    private EditText et;
    //公共属性的集合
    private String[] sps={"NUMBER:123","NUMBER:999","NUMBER:\"abc\"","STRING:\"公共属性\"","BOOL:\"bool\"","BOOL:true","BOOL:false","LIST:{\"a\"}","dt:2019-08-18","dynamic:System.currentTimeMillis","$test:@@","1as:1as","_we:_we","number:666","number:空字符串","number:null"};

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        view= inflater.inflate(R.layout.fragment_superpoperties, container, false);
        initViews();//初始化控件
        initEvents();//初始化事件
        initData();//初始化数据
        return view;
    }

    private void initViews(){

        btn_getsuper=view.findViewById(R.id.btn_getsuper);
        btn_deleteall=view.findViewById(R.id.btn_deleteall);
        btn_setsuper=view.findViewById(R.id.btn_setsuper);
        btn_delete=view.findViewById(R.id.btn_delete);

        sp3=view.findViewById(R.id.sp3);
        et=view.findViewById(R.id.et_sp);

    }

    private void initEvents(){

        btn_getsuper.setOnClickListener(this);
        btn_deleteall.setOnClickListener(this);
        btn_setsuper.setOnClickListener(this);
        btn_delete.setOnClickListener(this);
        sp3.setOnItemSelectedListener(this);
    }

    private void  initData(){

        adapter3 =new ArrayAdapter<>(this.getActivity(),android.R.layout.simple_spinner_item,sps);
        sp3.setAdapter(adapter3);
    }

    @Override
    public void onClick(View view) {

        //获取公共属性
        if (view.getId()==R.id.btn_getsuper){
            String value=SensorsDataAPI.sharedInstance().getSuperProperties().toString();
//            FileController.getFileControl().writeToLogFile("getSuperProperties()",null,value);
            Common.toast(this.getActivity().getApplicationContext(),value);
        }
        //删除所有公共属性
        if (view.getId()==R.id.btn_deleteall){
            SensorsDataAPI.sharedInstance().clearSuperProperties();
//            FileController.getFileControl().writeToLogFile("clearSuperProperties()",null,null);
        }
        //删除单个属性
        if (view.getId()==R.id.btn_delete){
            String string=et.getText().toString();
            SensorsDataAPI.sharedInstance().unregisterSuperProperty(string);
//            FileController.getFileControl().writeToLogFile("unregisterSuperProperty(string)",string,null);
        }
        //设置公共属性/动态公共属性
        if (view.getId()==R.id.btn_setsuper){
            int pos=sp3.getSelectedItemPosition();
            JSONObject properties = new JSONObject();
            JSONArray array=null;
            try {
                switch (pos){
                    case 0:
                        properties.put("NUMBER",123);
                        break;
                    case 1:
                        properties.put("NUMBER",999);
                        break;
                    case 2:
                        properties.put("NUMBER","abc");
                        break;
                    case 3:
                        properties.put("STRING","公共属性");
                        break;
                    case 4:
                        properties.put("BOOL","bool");
                        break;
                    case 5:
                        properties.put("BOOL",true);
                        break;
                    case 6:
                        properties.put("BOOL",false);
                        break;
                    case 7:
                        array=new JSONArray();
                        array.put("a");
                        properties.put("LIST",array);
                        break;
                    case 8:
                        properties.put("dt","2019-08-18");
                        break;
                    case 10:
                        properties.put("$test","@@");
                        break;
                    case 11:
                        properties.put("1as","1as");
                        break;
                    case 12:
                        properties.put("_we","_we");
                        break;
                    case 13:
                        properties.put("number",666);
                        break;
                    case 14:
                        properties.put("number","");
                        break;
                    case 15:
                        properties.put("number",null);
                        break;
                }

            }catch (JSONException e) {
                e.printStackTrace();
            }
            if (pos==9){
                SensorsDataDynamicSuperProperties dynamicSuperProperties=new SensorsDataDynamicSuperProperties() {
                    @Override
                    public JSONObject getDynamicSuperProperties() {
                        try {
                            JSONObject object=new JSONObject();
                            object.put("dynamic",System.currentTimeMillis());
                            return object;
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        return null;
                    }
                };
                SensorsDataAPI.sharedInstance().registerDynamicSuperProperties(dynamicSuperProperties);
//                FileController.getFileControl().writeToLogFile("registerDynamicSuperProperties(dynamicSuperProperties)",dynamicSuperProperties.toString(),null);

            } else{
                SensorsDataAPI.sharedInstance().registerSuperProperties(properties);
//                FileController.getFileControl().writeToLogFile("registerSuperProperties(properties)",properties.toString(),null);
            }
        }

    }


    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int i, long l) {
    }

    @Override
    public void onNothingSelected(AdapterView<?> adapterView) {

    }
}

