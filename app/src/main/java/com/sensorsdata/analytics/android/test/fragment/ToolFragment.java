package com.sensorsdata.analytics.android.test.fragment;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.telephony.TelephonyManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;

import com.sensorsdata.analytics.android.sdk.SALog;
import com.sensorsdata.analytics.android.sdk.SensorsDataFragmentTitle;
import com.sensorsdata.analytics.android.sdk.SensorsDataIgnoreTrackOnClick;
import com.sensorsdata.analytics.android.sdk.util.SensorsDataUtils;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.adapter.LogAdapter;
import com.sensorsdata.analytics.android.test.utils.Common;
import com.sensorsdata.analytics.android.test.utils.FileController;

import java.util.ArrayList;
import java.util.List;
@SensorsDataFragmentTitle(title = "toolTest")
public class ToolFragment extends Fragment implements AdapterView.OnItemClickListener {

    private ListView listView;
    private List<String> list;
    private LogAdapter adapter;
    private View view;

    @SensorsDataIgnoreTrackOnClick
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceStateApp) {
        view = inflater.inflate(R.layout.fragment_tool, container, false);
        initView();
        initData();
        initEvent();
        listView.setAdapter(adapter);
        listView.setOnItemClickListener(this);
        Common.loge("本页面使用了以下注解:@SensorsDataIgnoreTrackOnClick");
        return view;
    }

    private void initView(){
        listView=view.findViewById(R.id.tool_lv);

    }

    private void initEvent(){
        listView.setOnItemClickListener(this);
    }

    private void initData(){
        list=new ArrayList<>();
        list.add("打开渠道链接");
        list.add("打开DeepLink链接");
        list.add("复制文本");
        list.add("获取IMEI");
        list.add("获取DeviceId");
        list.add("getDeviceId(0)获取卡槽1");
        list.add("getDeviceId(1)获取卡槽2");
        list.add("getIMEI(0)获取卡槽1");
        list.add("getIMEI(1)获取卡槽2");
        list.add("获取MEID");
        list.add("getMEID(0)获取卡槽1");
        list.add("getMEID(1)获取卡槽2");
        list.add("ANR(点击该按钮后迅速点击返回键)");
        list.add("删除本地异常事件日志");
        adapter=new LogAdapter(getContext(),list);
        listView.setAdapter(adapter);
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
    }

    /*
     * 此方法谨慎修改
     * 插件配置 disableIMEI 会修改此方法
     * 获取IMEI
     *
     * @param mContext Context
     * @return IMEI
     */
    @SuppressLint({"MissingPermission", "HardwareIds"})
    public static String getIMEI(Context mContext) {
        String imei = "";
        try {
            TelephonyManager tm = (TelephonyManager) mContext.getSystemService(Context.TELEPHONY_SERVICE);
            if (tm != null) {
                if (Build.VERSION.SDK_INT > Build.VERSION_CODES.P) {
                    if (tm.hasCarrierPrivileges()) {
                        imei = tm.getImei();
                    } else {
                        //SALog.d(TAG, "Can not get IMEI info.");
                    }
                } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    imei = tm.getImei();
                } else {
                    imei = tm.getDeviceId();
                }
            }
        } catch (Exception e) {
            SALog.printStackTrace(e);
        }
        return imei;
    }

    public static String getMEID(Context mContext) {
        String imei = "";
        return imei;
    }

    public static String getMEID(Context mContext, int slot) {
        String imei = "";
        return imei;
    }

    /**
     * 获取设备唯一标识
     *
     * @param mContext Context
     * @return 设备唯一标识
     */
    public static String getIMEIOld(Context mContext) {
        String imei = "";
        return imei;
    }

    /**
     * 获取设备唯一标识
     *
     * @param mContext Context
     * @param number 卡槽
     * @return 设备唯一标识
     */
    public static String getSim(Context mContext, int number) {
        String imei = "";
        return imei;
    }

    /**
     * 获取设备唯一标识
     *
     * @param mContext Context
     * @param number 卡槽
     * @return 设备唯一标识
     */
    public static String getSlot(Context mContext, int number) {
        String imei = "";
        return imei;
    }

    @Override
    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
        switch (list.get(i)){
            case "打开渠道链接":
//                SASDK.init(getContext());
                Common.openUrl(getContext(),Common.CHANNEL_URL);
                break;
            case "打开DeepLink链接":
                Common.openUrl(getContext(),Common.DEEPLINK_URL);
                android.os.Process.killProcess(android.os.Process.myPid());
                System.exit(0);
                break;
            case "获取IMEI":
                list.set(i,"获取IMEI:"+getIMEI(getContext()));
                break;
            case "获取DeviceId":
                list.set(i,"获取DeviceId:"+getIMEIOld(getContext()));
                break;
            case "getDeviceId(0)获取卡槽1":
                list.set(i,"getDeviceId(0)获取卡槽1:"+getSim(getContext(),0));
                break;
            case "getDeviceId(1)获取卡槽2":
                list.set(i,"getDeviceId(1)获取卡槽2:"+getSim(getContext(),1));
                break;
            case "getIMEI(0)获取卡槽1":
                list.set(i,"getIMEI(0)获取卡槽1:"+getSlot(getContext(),0));
                break;
            case "getIMEI(1)获取卡槽2":
                list.set(i,"getIMEI(1)获取卡槽2:"+getSlot(getContext(),1));
                break;
            case "获取MEID":
                list.set(i,"获取MEID:"+getMEID(getContext()));
                break;
            case "getMEID(0)获取卡槽1":
                list.set(i,"getMEID(0)获取卡槽1:"+getMEID(getContext(),0));
                break;
            case "getMEID(1)获取卡槽2:":
                list.set(i,"getMEID(1)获取卡槽2:"+getMEID(getContext(),1));
                break;
            case "ANR(点击该按钮后迅速点击返回键)":
                int pos=0;
                while (pos<1){
                }
                break;
            case "复制文本":
                //获取剪贴版
                ClipboardManager clipboard = (ClipboardManager)getContext().getSystemService(Context.CLIPBOARD_SERVICE);
                //创建ClipData对象
                //第一个参数只是一个标记，随便传入,第二个参数是要复制到剪贴版的内容
                ClipData clip = ClipData.newPlainText("simple text", Common.DEEPLINK_URL);
                //传入clipdata对象.
                clipboard.setPrimaryClip(clip);
                Common.toast(getContext(),"复制成功");
                break;
            case "删除本地异常事件日志":
                FileController.getFileControl().deleteLogFile(Common.WRONG_EVENT);
                break;
            default:break;
        }
        adapter.notifyDataSetChanged();

    }

    @SensorsDataIgnoreTrackOnClick
    @Override
    public void setUserVisibleHint(boolean isVisibleToUser) {
        super.setUserVisibleHint(isVisibleToUser);
    }

    @SensorsDataIgnoreTrackOnClick
    @Override
    public void onHiddenChanged(boolean hidden) {
        super.onHiddenChanged(hidden);
    }


    public void setUserVisibleHint() {
        super.onResume();
    }

    @SensorsDataIgnoreTrackOnClick
    @Override
    public void onResume() {
        super.onResume();
    }
}
