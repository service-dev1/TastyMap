## 🤩 시작하기
### ✅ 프로젝트를 clone을 받은 후 npm 이 아닌 <b>yarn</b> 으로 패키지 install, run 하기  
```
git clone https://github.com/service-dev1/TastyMap.git
cd Tastymap/front  
yarn install

// ios 실행
cd ios
pod install
yarn ios

// andoroid 실행
yarn android  
```
* npm run ios/android 로 빌드 할 경우,  
`Application has not been registered error` 에러가 나며, 앱 실행이 실패한다 (왜 인지는 ...)

* npm vs yarn  
보안, 속도 측면에서 yarn이 더 우수

<br/>

## 😅 에러 노트
### 1. `yarn install` 시, TypeError
```
TypeError: Cannot create property 'lastUpdateCheck' on string 'nodeLinker node-modules ces nodeLinker node-modules'
    at YarnRegistry.<anonymous> (/opt/homebrew/Cellar/yarn/1.22.22/libexec/lib/cli.js:92927:30)
    at Generator.next (<anonymous>)
    at step (/opt/homebrew/Cellar/yarn/1.22.22/libexec/lib/cli.js:310:30)
    at /opt/homebrew/Cellar/yarn/1.22.22/libexec/lib/cli.js:328:14
    at new Promise (<anonymous>)
    at new F (/opt/homebrew/Cellar/yarn/1.22.22/libexec/lib/cli.js:5539:28)
    at YarnRegistry.<anonymous> (/opt/homebrew/Cellar/yarn/1.22.22/libexec/lib/cli.js:307:12)
    at YarnRegistry.saveHomeConfig (/opt/homebrew/Cellar/yarn/1.22.22/libexec/lib/cli.js:92934:20)
    at Install.<anonymous> (/opt/homebrew/Cellar/yarn/1.22.22/libexec/lib/cli.js:7933:35)
```
✅ `~/.yarnrc`에서 ces를 지운다.

<br/>

### 2. `yarn ios` 시, FlipperKit 관련
```
The following build commands failed:
	CompileC /Users/KimSuyeon/Library/Developer/Xcode/DerivedData/MatzipApp-gkiacfuntxcswogwahyisapufumm/Build/Intermediates.noindex/Pods.build/Debug-iphonesimulator/FlipperKit.build/Objects-normal/arm64/FlipperPlatformWebSocket.o 
	/Users/KimSuyeon/Desktop/Workspace/TastyMap/front/ios/Pods/FlipperKit/iOS/FlipperKit/FlipperPlatformWebSocket.mm normal arm64 objective-c++ com.apple.compilers.llvm.clang.1_0.compiler (in target 'FlipperKit' from project 'Pods')
(1 failure)
```
✅ `ios/Pods/Flipper/xplat/Flipper/FlipperTransportTypes.h` 파일 수정
```
#pragma once

#include <string>
#include <functional> ← 이 줄 추가!

namespace facebook {
namespace flipper {
```
<br/>

## 🥳 [참고용] 빌드 성공한 스펙
react-native 0.72.6  
node 20.7.0  
npm 10.1.0  
yarn 1.22.22  
xcode 15.4 (macOS Sonoma)  
Android Studio Dolphin
