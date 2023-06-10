package com.sbnb

import android.content.Context
import android.graphics.Color
import android.os.Build
import android.view.View
import android.view.Window
import android.view.WindowInsetsController

fun Window.setStatusBarDarkIcons(dark: Boolean) {
  when {
    Build.VERSION_CODES.R <= Build.VERSION.SDK_INT -> insetsController?.setSystemBarsAppearance(
      if (dark) WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS else 0,
      WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
    )
    Build.VERSION_CODES.M <= Build.VERSION.SDK_INT -> decorView.systemUiVisibility = if (dark) {
      decorView.systemUiVisibility or View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
    } else {
      decorView.systemUiVisibility and View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR.inv()
    }
    else -> if (dark) {
      // dark status bar icons not supported on API level below 23, set status bar
      // color to black to keep icons visible
      statusBarColor = Color.BLACK
    }
  }
}

fun Window.setNavigationBarDarkIcons(dark: Boolean) {
  when {
    Build.VERSION_CODES.R <= Build.VERSION.SDK_INT -> insetsController?.setSystemBarsAppearance(
      if (dark) WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS else 0,
      WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS
    )
    Build.VERSION_CODES.O <= Build.VERSION.SDK_INT -> decorView.systemUiVisibility = if (dark) {
      decorView.systemUiVisibility or View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR
    } else {
      decorView.systemUiVisibility and View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR.inv()
    }
    else -> if (dark) {
      // dark navigation bar icons not supported on API level below 26, set navigation bar
      // color to black to keep icons visible
      navigationBarColor = Color.BLACK
    }
  }
}

public enum class SystemNavigationMode(val integer: Int) {
  THREE_BUTTONS(0),
  TWO_BUTTONS(1),
  GESTURE(2),
}

val Context.navigationBarHeight: Int
  get() = resources.getDimensionPixelSize(
    resources.getIdentifier(
      "navigation_bar_height",
      "dimen",
      "android"
    )
  )

val Context.statusBarHeight: Int
  get() = resources.getDimensionPixelSize(
    resources.getIdentifier(
      "status_bar_height",
      "dimen",
      "android"
    )
  )

val Context.systemNavigationMode: SystemNavigationMode
  get() = with(
    resources.getIdentifier(
      "config_navBarInteractionMode",
      "integer",
      "android"
    )
  ) {
    SystemNavigationMode.values().find {
      it.integer == if (0 < this) resources.getInteger(this) else 0
    } ?: SystemNavigationMode.THREE_BUTTONS
  }
