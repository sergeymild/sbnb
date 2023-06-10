package com.sbnb

import android.graphics.Color
import android.os.Build
import androidx.core.view.WindowCompat
import com.facebook.react.bridge.ColorPropConverter
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class SbnbModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  var isFitsSystemWindows = true

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
    currentActivity?.runOnUiThread {
      currentActivity?.let {
        isFitsSystemWindows = isEnabled
        WindowCompat.setDecorFitsSystemWindows(it.window, isFitsSystemWindows)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
          it.window?.isNavigationBarContrastEnforced = false
        }
        if (it.systemNavigationMode == SystemNavigationMode.GESTURE) {
          it.window.navigationBarColor = Color.TRANSPARENT
        }
        if (isFitsSystemWindows) {
          it.window.navigationBarColor = it.window.statusBarColor
        }
      }
    }
  }

  companion object {
    const val NAME = "Sbnb"
  }
}
