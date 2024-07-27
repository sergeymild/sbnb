package com.sbnb

import android.graphics.Color
import android.os.Build
import android.view.View
import android.view.WindowInsetsController
import androidx.core.view.WindowCompat
import com.facebook.react.bridge.ColorPropConverter
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.uimanager.PixelUtil

class SbnbModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  var isFitsSystemWindows = true

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun statusBarHeight(): Double {
    return PixelUtil.toDIPFromPixel(currentActivity!!.statusBarHeight.toFloat()).toDouble()
  }
  @ReactMethod(isBlockingSynchronousMethod = true)
  fun navigationBarHeight(): Double {
    if (isFitsSystemWindows) return 0.0
    return PixelUtil.toDIPFromPixel(currentActivity!!.navigationBarHeight.toFloat()).toDouble()
  }

  @ReactMethod
  fun setStatusBarStyle(dark: Boolean) {
    currentActivity?.runOnUiThread {
      val activity = currentActivity ?: return@runOnUiThread
      if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return@runOnUiThread
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        activity.window.decorView.windowInsetsController?.setSystemBarsAppearance(
          if (dark) WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS else 0,
          WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
        );
      } else {
        if (!dark) {
          // Draw light icons on a dark background color
          activity.window.decorView.systemUiVisibility =
            activity.window.decorView.systemUiVisibility and View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR.inv()
        } else {
          // Draw dark icons on a light background color
          activity.window.decorView.systemUiVisibility =
            activity.window.decorView.systemUiVisibility or View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
        }
      }
    }
  }

  @ReactMethod
  fun setSystemUIColor(color: Double) {
    currentActivity?.runOnUiThread {
      currentActivity?.let {
        val newColor = ColorPropConverter.getColor(color, it)
        it.window.statusBarColor = newColor
        if (isFitsSystemWindows || it.systemNavigationMode != SystemNavigationMode.GESTURE) {
          it.window.navigationBarColor = newColor
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
          it.window?.isNavigationBarContrastEnforced = false
        }
      }
    }
  }

  @ReactMethod
  fun toggleFitsSystemWindows(isEnabled: Boolean) {
    //currentActivity?.runOnUiThread {
    //  currentActivity?.let {
    //    isFitsSystemWindows = isEnabled
    //    WindowCompat.setDecorFitsSystemWindows(it.window, isFitsSystemWindows)
    //    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
    //      it.window?.isNavigationBarContrastEnforced = false
    //    }
    //    if (it.systemNavigationMode == SystemNavigationMode.GESTURE) {
    //      it.window.navigationBarColor = Color.TRANSPARENT
    //    }
    //    if (isFitsSystemWindows) {
    //      it.window.navigationBarColor = it.window.statusBarColor
    //    }
    //  }
    //}
  }

  companion object {
    const val NAME = "Sbnb"
  }
}
