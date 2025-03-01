package com.sbnb

import com.facebook.react.BaseReactPackage
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager


class SbnbPackage : BaseReactPackage() {

  override fun getModule(name: String, context: ReactApplicationContext): NativeModule? {
    if (SbnbModule.NAME == name) {
      return SbnbModule(context);
    }
    return null
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      val moduleInfoMap: MutableMap<String, ReactModuleInfo> = HashMap()
      moduleInfoMap[SbnbModule.NAME] = ReactModuleInfo(
        SbnbModule.NAME,
        SbnbModule.NAME,
        false,  // canOverrideExistingModule
        false,  // needsEagerInit
        false,  // isCxxModule
        true // isTurboModule
      )
      moduleInfoMap
    }
  }
}
