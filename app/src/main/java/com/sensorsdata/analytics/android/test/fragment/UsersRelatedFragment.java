package com.sensorsdata.analytics.android.test.fragment;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.text.InputType;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;

import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.utils.Common;
import com.sensorsdata.analytics.android.test.utils.Users;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class UsersRelatedFragment extends Fragment implements View.OnClickListener, AdapterView.OnItemSelectedListener {
    private Users users=new Users();

    private TextView textView_anonymousId;
    private EditText EditText_anonymousId;
    private TextView textView_loginId;
    private EditText EditText_loginId;
    private TextView textView_distinctId;
    private String[] spinnerItems={"空","null","string","bool","number","list","datetime"};
    private Spinner mSpinner;
    private EditText EditText_key;
    private EditText EditText_value;
    private JSONObject myjson=new JSONObject();
    private Map<String,Number> mymap=new HashMap<String,Number>();
    private Set<String> myset=new HashSet<String>();
    private EditText EditText_itemType;
    private EditText EditText_itemId;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_users_related, container, false);
        view.findViewById(R.id.btn_getAnonymousId).setOnClickListener(this);
        view.findViewById(R.id.btn_resetAnonymousId).setOnClickListener(this);
        view.findViewById(R.id.btn_setAnonymousId).setOnClickListener(this);
        view.findViewById(R.id.btn_getLoginId).setOnClickListener(this);
        view.findViewById(R.id.btn_setLoginId).setOnClickListener(this);
        view.findViewById(R.id.btn_logout).setOnClickListener(this);
        view.findViewById(R.id.btn_getdistinctId).setOnClickListener(this);
        view.findViewById(R.id.btn_setprofile).setOnClickListener(this);
        view.findViewById(R.id.btn_unsetprofile).setOnClickListener(this);
        view.findViewById(R.id.btn_setonceprofile).setOnClickListener(this);
        view.findViewById(R.id.btn_increment).setOnClickListener(this);
        view.findViewById(R.id.btn_append).setOnClickListener(this);

        view.findViewById(R.id.btn_addtojson).setOnClickListener(this);
        view.findViewById(R.id.btn_clearjson).setOnClickListener(this);
        view.findViewById(R.id.btn_addtomap).setOnClickListener(this);
        view.findViewById(R.id.btn_clearmap).setOnClickListener(this);
        view.findViewById(R.id.btn_setprofile_json).setOnClickListener(this);
        view.findViewById(R.id.btn_setonceprofile_json).setOnClickListener(this);
        view.findViewById(R.id.btn_increment_map).setOnClickListener(this);
        view.findViewById(R.id.btn_append_set).setOnClickListener(this);
        view.findViewById(R.id.btn_pushid).setOnClickListener(this);
        view.findViewById(R.id.btn_deleteprofile).setOnClickListener(this);
        view.findViewById(R.id.btn_setitem).setOnClickListener(this);
        view.findViewById(R.id.btn_deleteitem).setOnClickListener(this);

        view.findViewById(R.id.btn_flushall).setOnClickListener(this);
        view.findViewById(R.id.btn_setLoginId_withproperty).setOnClickListener(this);

        textView_anonymousId = view.findViewById(R.id.tv_AnonymousId);
        textView_anonymousId.setOnClickListener(this);
        textView_loginId = view.findViewById(R.id.tv_loginId);
        textView_loginId.setOnClickListener(this);
        textView_distinctId = view.findViewById(R.id.tv_distinctId);
        textView_distinctId.setOnClickListener(this);


        EditText_anonymousId=view.findViewById(R.id.et_setAnonymousId);
        EditText_anonymousId.setOnClickListener(this);
        EditText_loginId=view.findViewById(R.id.et_setLoginId);
        EditText_loginId.setOnClickListener(this);

        EditText_key=view.findViewById(R.id.et_key);
        EditText_key.setOnClickListener(this);

        EditText_value=view.findViewById(R.id.et_value);
        EditText_value.setOnClickListener(this);


        EditText_itemType=view.findViewById(R.id.et_itemType);
        EditText_itemType.setOnClickListener(this);
        EditText_itemId=view.findViewById(R.id.et_itemId);
        EditText_itemId.setOnClickListener(this);

        //初始化spinner
        initSpinner(view);
        return view;

    }


    //初始化spinner
    private void initSpinner(View view){
        mSpinner=(Spinner) view.findViewById(R.id.spinner_valuetype);
        ArrayAdapter spinnerAdapter=new ArrayAdapter<>(this.getContext(), R.layout.item_select_auto,spinnerItems);
        spinnerAdapter.setDropDownViewResource(R.layout.item_select_auto);
        mSpinner.setAdapter(spinnerAdapter);
        //点击响应事件
        mSpinner.setOnItemSelectedListener(this);
    }


    @Override
    public void onClick(View v) {

        String itemType = EditText_itemType.getText().toString();
        String itemId = EditText_itemId.getText().toString();

        String new_anonymousId = EditText_anonymousId.getText().toString();
        String new_loginId=EditText_loginId.getText().toString();

        String getKey=EditText_key.getText().toString();
        Object getValue = EditText_value.getText();
        int pos=mSpinner.getSelectedItemPosition();

        if ("空".equals(spinnerItems[pos])){
            getValue="";
        }else if ("null".equals(spinnerItems[pos])){
            getValue=null;
        }else if("string".equals(spinnerItems[pos])){
            getValue=getValue.toString();
        }else if ("bool".equals(spinnerItems[pos])){
            if ("0".equals(getValue.toString())){
                getValue=false;
            }else {
                getValue=true;
            }
        }else if ("number".equals(spinnerItems[pos])){
            try {
                getValue=Integer.valueOf(getValue.toString());
            }catch (Exception e){
                e.printStackTrace();
                Common.toast(this.getContext(),"请正确输入数字");
                return;
            }

        }else if ("datetime".equals(spinnerItems[pos])){
            getValue=getValue.toString();
        }else if("list".equals(spinnerItems[pos])){
            getValue=string_to_list(getValue.toString());
        }

        switch (v.getId()){
            case R.id.btn_getAnonymousId:
                String getId = users.getAnonymousId();
                textView_anonymousId.setText(getId);
                break;

            case R.id.btn_resetAnonymousId:
                users.resetAnonymousId();
                Common.toast(this.getContext(),"重置匿名ID成功");
                break;

            case R.id.btn_setAnonymousId:
                users.identify(new_anonymousId);
                Common.toast(this.getContext(),"设置匿名ID成功");
                break;

            case R.id.btn_getLoginId:
                String getLoginId=users.getLoginId();
                if (getLoginId==null){
                    Common.toast(this.getContext(),"登录 ID 为 NULL");
                }else {
                    textView_loginId.setText(getLoginId);
                }
                break;

            case R.id.btn_logout:
                users.logout();
                Common.toast(this.getContext(),"用户已注销");
                break;

            case R.id.btn_setLoginId:
                users.login(new_loginId);
                Common.toast(this.getContext(),"用户设置loginId成功");
                break;

            case R.id.btn_getdistinctId:
                String distinctID = users.getDistinctId();
                textView_distinctId.setText(distinctID);
                break;

            case R.id.btn_setprofile:
                //users.profileSet_kv(getKey,getValue);
                JSONObject jsonObject =new JSONObject();
                try {
                    jsonObject.put("view_time","2021-11-11 12:30:33");
                    SensorsDataAPI.sharedInstance().profileSetOnce(jsonObject);
//                    jsonObject.remove("first_view_time");
//                    jsonObject.put("hero","aaa");
//                    SensorsDataAPI.sharedInstance().profileSet(jsonObject);
//                    SensorsDataAPI.sharedInstance().profileAppend("Apple","bbb");
//                    SensorsDataAPI.sharedInstance().profileIncrement("money",988);
//                    SensorsDataAPI.sharedInstance().profilePushId("type123","id123");
//                    SensorsDataAPI.sharedInstance().itemSet("itype111","itid222",jsonObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                break;

            case R.id.btn_unsetprofile:
//                users.profileUnset(getKey);
                SensorsDataAPI.sharedInstance().profileUnset("money");
                SensorsDataAPI.sharedInstance().itemDelete("itype111","itid222");
                break;

            case R.id.btn_setonceprofile:
                users.profileSetOnce_kv(getKey,getValue);
                break;

            case R.id.btn_increment:
                if ("number".equals(spinnerItems[pos])||"null".equals(spinnerItems[pos])){
                    users.profileIncrement(getKey,(Number) getValue);
                }else {
                    Common.toast(this.getContext(),"属性值不是Number或null");
                }
                break;

            case R.id.btn_append:
                users.profileAppend(getKey,(String) getValue);
                break;

            case R.id.btn_deleteprofile:
                users.profileDelete();
                Common.toast(this.getContext(),"删除用户属性成功");
                break;

            case R.id.btn_pushid:
                users.profilePushId(getKey,(String) getValue);
                break;

            case R.id.btn_setitem:
                users.itemSet(itemType,itemId,myjson);
                break;

            case R.id.btn_deleteitem:
                users.itemDelete(itemType,itemId);
                break;

            case R.id.btn_addtojson:
                try {
                    myjson.put(getKey,getValue);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                break;

            case R.id.btn_setprofile_json:
                users.profileSet(myjson);
                break;

            case R.id.btn_setonceprofile_json:
                users.profileSetOnce(myjson);
                break;

            case R.id.btn_addtomap:
                if ("number".equals(spinnerItems[pos])||"null".equals(spinnerItems[pos])){
                    mymap.put(getKey,(Number) getValue);
                }else {
                    Common.toast(this.getContext(),"属性值不是number或null类型");
                }
                break;

            case R.id.btn_increment_map:
//                Logger.d("走到increment_map");
                users.profileIncrement_map(mymap);
                break;

            case R.id.btn_append_set:
                if ("list".equals(spinnerItems[pos])){
                    Set<String> tmpset=new HashSet<String>();
                    try {
                        tmpset = jsonarray_to_set((JSONArray) getValue);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    users.profileAppend_set(getKey,tmpset);
                }else {
                    Common.toast(this.getContext(),"请选择list类型");
                }
                break;

            case R.id.btn_clearjson:
                myjson=new JSONObject();
                break;

            case R.id.btn_clearmap:
                mymap.clear();
                break;

            case R.id.btn_flushall:
//                SensorsDataAPI.sharedInstance().flushSync();
                break;

            case R.id.btn_setLoginId_withproperty:
                users.login_properties(new_loginId,myjson);
                break;

            default:
                break;

        }

    }


    public JSONArray string_to_list(String string){
        String str2=string.replace(" ", "");
        List<String> list2= Arrays.asList(str2.split(","));
        JSONArray jsonArray = new JSONArray();
        for (int i=0;i<list2.size();i++){
            jsonArray.put(list2.get(i));

        }
        return jsonArray;
    }


    //将jsonarray转为list set
    public Set<String> jsonarray_to_set(JSONArray jsonArray) throws JSONException {
        Set<String> tmpset=new HashSet<String>();
        for (int i=0;i<jsonArray.length();i++){
            tmpset.add((String) jsonArray.get(i));
        }
        return tmpset;
    }


    //将string转set数据
    public void dealSet(String list){
        String str2=list.replace(" ", "");
        List<String> list2= Arrays.asList(str2.split(","));
        myset.addAll(list2);
    }


    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        switch (spinnerItems[position]){

            case "空":
                EditText_value.setHint("空");
                EditText_value.setEnabled(false);
                break;

            case "null":
                EditText_value.setHint("null");
                EditText_value.setEnabled(false);
                EditText_value.setInputType(InputType.TYPE_NULL);
                break;

            case "string":
                EditText_value.setEnabled(true);
                EditText_value.setHint("传入字符串");
                break;

            case "bool":
                EditText_value.setEnabled(true);
                EditText_value.setHint("0false/其他true");
                break;

            case "number":
                EditText_value.setEnabled(true);
                EditText_value.setHint("number类型");
                break;

            case "list":
                EditText_value.setEnabled(true);
                EditText_value.setHint("设置list，以逗号分割");
                break;

            case "datetime":
                EditText_value.setEnabled(true);
                EditText_value.setHint("传入string类型的日期格式");
                break;

            default:
                break;

        }


    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {

    }
}
