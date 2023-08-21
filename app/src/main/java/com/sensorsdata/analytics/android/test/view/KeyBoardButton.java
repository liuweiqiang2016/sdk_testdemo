package com.sensorsdata.analytics.android.test.view;

import android.annotation.SuppressLint;
import android.content.Context;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;
import android.widget.Button;


@SuppressLint("AppCompatCustomView")
public class KeyBoardButton extends Button {

    /*
    * 对指定项目打包命令
    *  ./gradlew :simpleName:assemble 例如：
    *  ./gradlew :MyButton:assembleRelease   // 打release，没有修饰将会输出debug及release包
    * */

    public KeyBoardButton(Context context) {
        super(context);
    }

    public KeyBoardButton(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public KeyBoardButton(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public KeyBoardButton(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
    }

    public void setAction(){
       this.setText("自定义KeyBoard按钮");
       this.setOnClickListener(new OnClickListener() {
           @Override
           public void onClick(View view) {
               Log.e("SA.TJar", "onClick: "+"KeyBoard按钮点击了==============");
           }
       });

    }



}
