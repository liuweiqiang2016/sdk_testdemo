package com.sensorsdata.analytics.android.test.fragment;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.app.NotificationCompat;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.sensorsdata.analytics.android.sdk.SensorsDataFragmentTitle;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.activity.H5Activity;
import com.sensorsdata.analytics.android.test.receiver.AlertReceiver;
import com.sensorsdata.analytics.android.test.service.MyForegroundService;
import com.sensorsdata.analytics.android.test.service.MyService;

import java.util.ArrayList;

import static android.content.Context.NOTIFICATION_SERVICE;

/*
* 测试推送点击的 Fragment
* */
@SensorsDataFragmentTitle(title = "title_push")
public class PushFragment extends Fragment implements AdapterView.OnItemClickListener {

    private ListView listView;
    private ArrayList<String> list;
    private ArrayAdapter<String> adapter;
    private View view;
    private String[] types;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_push, container, false);
        initData();
        initView();
        initEvents();
        return view;
    }

    private void initData(){
        types=new String[]{"跳转页面","跳转广播","跳转普通服务","跳转前台服务"};
    }

    private void initView(){
        listView=view.findViewById(R.id.push_lv);
        adapter=new ArrayAdapter<String>(this.getContext(),android.R.layout.simple_list_item_1,types);
        listView.setAdapter(adapter);
    }

    private void initEvents(){
        listView.setOnItemClickListener(this);
    }

    @Override
    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
        showNotification(types[i]);

    }

    void showNotification(String type){
        switch (type){
            case "跳转页面":
                createNotification(getContext());
                break;
            case"跳转广播":
                createNotificationBroadcast(getContext());
                break;
            case "跳转普通服务":
                createNotificationService(getContext());
                break;
            case "跳转前台服务":
                createNotificationForegroundService(getContext());
                break;
            default:
                break;


        }



    }



    private void createNotification(Context context) {
        String channelID = "100";
        // 获取 NotificationManager 实例
        NotificationManager notifyManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (notifyManager == null) return;
        // 获取 PendingIntent
        Intent intent = new Intent();
        intent.setClass(context, H5Activity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.putExtra("title", "传输 title");
        intent.putExtra("content",  "传输 content");
        int requestCode = 0;
        int flag = PendingIntent.FLAG_UPDATE_CURRENT;
        PendingIntent mainPendingIntent = PendingIntent.getActivity(context, requestCode, intent, flag);

        // 实例化NotificationCompat.Builde并设置相关属性
        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, channelID)
                // 设置小图标
                .setSmallIcon(R.mipmap.ic_launcher)
                // 设置通知标题
                .setContentTitle("自定义通知")
                // 点击通知后自动清除
                .setAutoCancel(true)
                // 设置通知内容
                .setContentText("跳转到页面")
                // 锁屏可见
                .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
                .setContentIntent(mainPendingIntent);
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationChannel channel = new NotificationChannel(channelID, "channel_name", android.app.NotificationManager.IMPORTANCE_HIGH);
            channel.setDescription("我是一个通知通道");
            notifyManager.createNotificationChannel(channel);
        }
        // 通过 builder.build() 方法生成 Notification 对象,并发送通知,id=1
        Notification b = builder.build();
        String tag = "1";
        int id = 1;
        notifyManager.notify(tag,id, b);
    }




    private void createNotificationBroadcast(Context context) {
        String channelID = "100";
        NotificationManager notifyManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

        Intent setAlertIntent=new Intent(context, AlertReceiver.class);
        setAlertIntent.setAction("com.example.MY_GEOFENCE");
        setAlertIntent.putExtra("try", "i'm just have a try");
        int requestCode = 1;
        int flag = PendingIntent.FLAG_UPDATE_CURRENT;
        PendingIntent mainPendingIntent = PendingIntent.getBroadcast(context,  requestCode, setAlertIntent,PendingIntent.FLAG_UPDATE_CURRENT);

        // 实例化NotificationCompat.Builde并设置相关属性
        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, channelID)
                // 设置小图标
                .setSmallIcon(R.mipmap.ic_launcher)
                // 设置通知标题
                .setContentTitle("展示的 title")
                // 点击通知后自动清除
                .setAutoCancel(true)
                // 设置通知内容
                .setContentText("展示的的 内容")
                // 锁屏可见
                .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
                .setContentIntent(mainPendingIntent);
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationChannel channel = new NotificationChannel(channelID, "channel_name", android.app.NotificationManager.IMPORTANCE_HIGH);
            channel.setDescription("我是一个通知通道");
            notifyManager.createNotificationChannel(channel);
        }
        // 通过 builder.build() 方法生成 Notification 对象,并发送通知,id=1
        Notification b = builder.build();
        int id = 1;
        notifyManager.notify(id, b);
    }

    private void createNotificationService(Context context) {
        String channelID = "100";
        NotificationManager notifyManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

        Intent setAlertIntent=new Intent(context, MyService.class);
        setAlertIntent.setAction("com.example.MY_GEOFENCE");
        setAlertIntent.putExtra("try", "i'm just have a try");
        int requestCode = 1;
        int flag = PendingIntent.FLAG_UPDATE_CURRENT;
        PendingIntent mainPendingIntent = PendingIntent.getService(context,  requestCode, setAlertIntent,PendingIntent.FLAG_UPDATE_CURRENT);
        // 实例化NotificationCompat.Builde并设置相关属性
        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, channelID)
                // 设置小图标
                .setSmallIcon(R.mipmap.ic_launcher)
                // 设置通知标题
                .setContentTitle("展示的 title")
                // 点击通知后自动清除
                .setAutoCancel(true)
                // 设置通知内容
                .setContentText("展示的的 内容")
                // 锁屏可见
                .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
                .setContentIntent(mainPendingIntent);
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationChannel channel = new NotificationChannel(channelID, "channel_name", android.app.NotificationManager.IMPORTANCE_HIGH);
            channel.setDescription("我是一个通知通道");
            notifyManager.createNotificationChannel(channel);
        }
        // 通过 builder.build() 方法生成 Notification 对象,并发送通知,id=1
        Notification b = builder.build();
        int id = 1;
        notifyManager.notify(id, b);
    }

    private void createNotificationForegroundService(Context context) {
        Intent setAlertIntent=new Intent(context, MyForegroundService.class);
        setAlertIntent.setAction("com.example.MY_GEOFENCE");
        setAlertIntent.putExtra("try", "i'm just have a try");

        String channelID = "100";
        NotificationManager notifyManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

        int requestCode = 1;
        int flag = PendingIntent.FLAG_UPDATE_CURRENT;
        PendingIntent mainPendingIntent = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            mainPendingIntent = PendingIntent.getForegroundService(context,  requestCode, setAlertIntent,PendingIntent.FLAG_UPDATE_CURRENT);
        }
        // 实例化NotificationCompat.Builde并设置相关属性
        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, channelID)
                // 设置小图标
                .setSmallIcon(R.mipmap.ic_launcher)
                // 设置通知标题
                .setContentTitle("展示的 title")
                // 点击通知后自动清除
                .setAutoCancel(true)
                // 设置通知内容
                .setContentText("展示的的 内容")
                // 锁屏可见
                .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
                .setContentIntent(mainPendingIntent);
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationChannel channel = new NotificationChannel(channelID, "channel_name", android.app.NotificationManager.IMPORTANCE_HIGH);
            channel.setDescription("我是一个通知通道");
            notifyManager.createNotificationChannel(channel);
        }
        // 通过 builder.build() 方法生成 Notification 对象,并发送通知,id=1
        Notification b = builder.build();
        int id = 1;
        notifyManager.notify(id, b);

    }


}
