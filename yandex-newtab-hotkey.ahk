#Requires AutoHotkey v2.0
#SingleInstance Force

extensionId := A_Args.Length >= 1 ? A_Args[1] : "pnapkfbpmoeilgeeliicognmbcknfbal"

if !RegExMatch(extensionId, "^[a-z]{32}$") {
  MsgBox "Invalid extension ID: " extensionId
  ExitApp
}

extensionUrl := "chrome-extension://" extensionId "/index.html"

#HotIf WinActive("ahk_exe browser.exe") || WinActive("ahk_exe yandex.exe")
$^t::{
  ; Yandex blocks extension new-tab overrides, so open its native tab first.
  Send "^t"
  Sleep 50
  SendText extensionUrl
  Send "{Enter}"
}
#HotIf
