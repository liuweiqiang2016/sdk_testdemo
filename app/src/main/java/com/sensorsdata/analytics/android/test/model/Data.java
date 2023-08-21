package com.sensorsdata.analytics.android.test.model;

public class Data {

    public static final int TYPE_BUTTON= 1;//类型1
    public static final int TYPE_EDITTEXT = 2;//类型2
    public static final int TYPE_SWITCH = 3;//类型3

    public int type;//控件类型
    public String title;//标题
    public boolean isCheck;//是否选中，只对switch控件有效

    public Data(int type, String title,boolean isCheck) {
        this.type = type;
        this.title = title;
        this.isCheck=isCheck;
    }

    public static int getTypeButton() {
        return TYPE_BUTTON;
    }

    public static int getTypeEdittext() {
        return TYPE_EDITTEXT;
    }

    public static int getTypeSwitch(){
        return TYPE_SWITCH;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isCheck() {
        return isCheck;
    }

    public void setCheck(boolean check) {
        isCheck = check;
    }

}
