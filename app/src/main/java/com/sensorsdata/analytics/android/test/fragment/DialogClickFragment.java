package com.sensorsdata.analytics.android.test.fragment;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.view.ContextMenu;
import android.view.LayoutInflater;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.PopupMenu;
import android.widget.TextView;
import android.widget.Toast;

import com.kongzue.dialog.interfaces.OnDialogButtonClickListener;
import com.kongzue.dialog.util.BaseDialog;
import com.kongzue.dialog.util.DialogSettings;
import com.kongzue.dialog.util.TextInfo;
import com.kongzue.dialog.v3.CustomDialog;
import com.kongzue.dialog.v3.MessageDialog;
import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.activity.DialogActivity;
import com.sensorsdata.analytics.android.test.activity.MyTabActivity;
import com.sensorsdata.analytics.android.test.activity.TabLayoutActivity;
import com.sensorsdata.analytics.android.test.utils.Common;
import com.sensorsdata.analytics.android.test.utils.FileController;

import java.util.ArrayList;
import java.util.List;


public class DialogClickFragment extends Fragment implements AdapterView.OnItemClickListener ,PopupMenu.OnMenuItemClickListener{

    private Button btn,btn_cmenu,btn_pmenu,btn_dialog;

    private ListView listView;
    private ArrayAdapter<String> adapter;
    private View view;
    public String[] types;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        view = inflater.inflate(R.layout.fragment_dialog_click, container, false);
        types=new String[]{"普通Dialog","单选Dialog","多选Dialog","双重Dialog","DialogActivity","ContextMenu","PopupMenu","Builder","TabHost页面","TabLayout页面"};
        listView=view.findViewById(R.id.dialog_lv);
        adapter=new ArrayAdapter<String>(this.getContext(),android.R.layout.simple_list_item_1,types);
        listView.setAdapter(adapter);
        listView.setOnItemClickListener(this);
        return view;
    }

    @Override
    public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {
        MenuInflater inflater=getActivity().getMenuInflater();
        inflater.inflate(R.menu.menu_def,menu);
        super.onCreateContextMenu(menu, v, menuInfo);
    }

    @Override
    public boolean onContextItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.menu_share:
                Common.toast(getActivity(),"share");
                break;
            case R.id.menu_send:
                Common.toast(getActivity(),"send");
                break;
        }
        return true;
    }


    private void initAlertDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(getContext());
        builder.setTitle("问题：");
        builder.setMessage("请问你满十八岁了吗?");
        builder.setIcon(R.mipmap.ic_launcher_round);
        //点击对话框以外的区域是否让对话框消失
        builder.setCancelable(true);
        //设置正面按钮
        builder.setPositiveButton("是的", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                Toast.makeText(getContext(), "你点击了是的", Toast.LENGTH_SHORT).show();
                dialog.dismiss();
            }
        });
        //设置反面按钮
        builder.setNegativeButton("不是", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                Toast.makeText(getContext(), "你点击了不是", Toast.LENGTH_SHORT).show();
                dialog.dismiss();
            }
        });
        //设置中立按钮
        builder.setNeutralButton("保密", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                Toast.makeText(getContext(), "你选择了保密", Toast.LENGTH_SHORT).show();
                dialog.dismiss();
            }
        });
        AlertDialog dialog = builder.create();
        SensorsDataAPI.sharedInstance().setViewID(dialog,"viewID");
        //对话框显示的监听事件
        dialog.setOnShowListener(new DialogInterface.OnShowListener() {
            @Override
            public void onShow(DialogInterface dialog) {
            }
        });
        //对话框消失的监听事件
        dialog.setOnCancelListener(new DialogInterface.OnCancelListener() {
            @Override
            public void onCancel(DialogInterface dialog) {
            }
        });
        //显示对话框
        dialog.show();
    }

    /**
     * 单选对话框
     *
     * @param
     */
    private int checkedItem = 0; //默认选中的item
    public void initSingleDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(getContext());
        builder.setTitle("你现在的居住地是：");
        String[] cities = {"北京", "上海", "广州", "深圳", "杭州", "天津", "成都","北京"};

        builder.setSingleChoiceItems(cities, checkedItem, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                checkedItem = which;
            }
        });
        //设置正面按钮
        builder.setPositiveButton("确认", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
            }
        });
        //设置反面按钮
        builder.setNegativeButton("取消", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
            }
        });
        AlertDialog dialog = builder.create();
        dialog.show();
    }

    /**
     * 复选（列表）对话框
     */
    public void initMultiDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(getContext());
        builder.setTitle("请选择你喜欢的颜色：");
        final String[] colors = {"红色", "橙色", "黄色", "绿色", "蓝色", "靛色", "紫色"};
        final List<String> myColors = new ArrayList<>();
        builder.setMultiChoiceItems(colors, null, new DialogInterface.OnMultiChoiceClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which, boolean isChecked) {
                if (isChecked) {
                    myColors.add(colors[which]);
                } else {
                    myColors.remove(colors[which]);
                }
            }
        });

        //设置正面按钮
        builder.setPositiveButton("确认", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                for (String color : myColors) {
                }
                dialog.dismiss();
            }
        });
        //设置反面按钮
        builder.setNegativeButton("取消", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                myColors.clear();
                dialog.dismiss();
            }
        });
        builder.show();
    }

    void initCusDialog(){
        MessageDialog
                .build((AppCompatActivity) getActivity())
                .setStyle(DialogSettings.STYLE.STYLE_IOS)
                .setButtonTextInfo(new TextInfo().setFontColor(Color.rgb(16,16,16)))
                .setCancelButton("取消")
                .setOkButton("充值")
                .setOnOkButtonClickListener(new OnDialogButtonClickListener() {
                    @Override
                    public boolean onClick(BaseDialog baseDialog, View v) {
//                        showBuyDialog();

                        return true;
                    }
                })
                .setOnCancelButtonClickListener(new OnDialogButtonClickListener() {
                    @Override
                    public boolean onClick(BaseDialog baseDialog, View v) {

                        return false;
                    }
                }).show();
    }

    private  void showBuyDialog() {
        CustomDialog.show((AppCompatActivity) getActivity(), R.layout.dialog_buy, new CustomDialog.OnBindView() {
            @Override
            public void onBind(final CustomDialog dialog, View v) {
                TextView afp = v.findViewById(R.id.tv_cancel);
                afp.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        dialog.doDismiss();
                    }
                });
                TextView btnOk = v.findViewById(R.id.tv_sure);
                btnOk.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        initCusDialog();
                    }
                });
            }
        });


    }

    private  void initBuilder() {
        AlertDialog.Builder builder=new AlertDialog.Builder(getContext());
        builder.setTitle("测试Builder");
        builder.setMessage("这是 message");
        builder.setPositiveButton("确定", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {

            }
        });
        builder.setNegativeButton("取消", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {

            }
        });
        builder.create().show();

    }


    @Override
    public boolean onMenuItemClick(MenuItem menuItem) {
        switch (menuItem.getItemId()){
            case R.id.menu_share:
                Common.toast(getActivity(),"share");
                break;
            case R.id.menu_send:
                Common.toast(getActivity(),"send");
                break;
        }
        return true;
    }

    @Override
    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
        String type=types[i];
        Intent intent;
        switch (type){
            case "普通Dialog":
                initAlertDialog();
                break;
            case "单选Dialog":
                initSingleDialog();
                break;
            case "多选Dialog":
                initMultiDialog();
                break;
            case "双重Dialog":
                showBuyDialog();
//                initCusDialog();
                break;
            case "DialogActivity":
                intent=new Intent(getActivity(), DialogActivity.class);
                startActivity(intent);
                break;
            case "ContextMenu":
                registerForContextMenu(view);
                break;
            case "PopupMenu":
                PopupMenu popupMenu=new PopupMenu(getActivity(),view);
                MenuInflater inflater=popupMenu.getMenuInflater();
                inflater.inflate(R.menu.menu_def,popupMenu.getMenu());
                //展示popupMenu
                popupMenu.show();
                //设置监听
                popupMenu.setOnMenuItemClickListener(this);
                break;
            case "Builder":
                initBuilder();
                break;
            case "TabHost页面":
                intent=new Intent(getActivity(), MyTabActivity.class);
                startActivity(intent);
                break;
            case "TabLayout页面":
                Intent intent2=new Intent(getActivity(), TabLayoutActivity.class);
                startActivity(intent2);
                break;
        }
    }
}
