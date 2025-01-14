# Irontrain 프론트엔드 채용 과제

React + TypeScript + Jest 를 사용하여 과제 구현하였습니다.

## Project 실행 가이드

branch

```
main branch
```

version

```
node 16.16.0
react 19.0.6
typescript ^5.7.3
```

npm install

```
npm install

* 의존성 에러 날시
npm install --legacy-peer-deps 로 설치
```

실행

```
npm run start
```

테스트

```
npm test
```

주소

```
로컬주소: localhost:3000

* git clone을 진행하지 않고 바로 프로젝트 확인에 용이하게 배포를 진행했습니다.
배포된주소: https://irontrain-test.vercel.app/
```

## 폴더트리

```
 ┣ 📂__mocks__
 ┃ ┣ 📜styleMock.js
 ┣ 📂public
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜index.html
 ┃ ┣ 📜irontrain.ico
 ┃ ┣ 📜logo192.png
 ┃ ┣ 📜logo512.png
 ┃ ┣ 📜manifest.json
 ┃ ┗ 📜robots.txt
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┃ ┗ 📂table
 ┃ ┃ ┃ ┗ 📂list
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📂style
 ┃ ┃ ┣ 📜Main.ts
 ┃ ┃ ┣ 📜Table.ts
 ┃ ┃ ┗ 📜spinner.ts
 ┃ ┣ 📜App.css
 ┃ ┣ 📜App.test.tsx
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜custom.d.ts
 ┃ ┣ 📜index.css
 ┃ ┣ 📜index.tsx
 ┃ ┣ 📜logo.svg
 ┃ ┣ 📜reportWebVitals.ts
 ┃ ┣ 📜setupTests.ts
 ┃ ┗ 📜type.ts
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜.prettierrc
 ┣ 📜README.md
 ┣ 📜babel.config.js
 ┣ 📜eslint.config.mjs
 ┣ 📜jest.config.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜setupTests.js
 ┣ 📜tsconfig.json
 ┗ 📜webpack.config.js
```

| 폴더, 파일        | 설명                                  |
| ----------------- | ------------------------------------- |
| mocks             | jest css 읽을 수 있게 하는 폴더       |
| public            | base setting folder                   |
| src               | source code folder                    |
| .env              | host url 저장해놓은 파일              |
| babel.config.js   | babel 설정 파일                       |
| eslint.config.mjs | eslint 설정파일                       |
| jest.config.js    | jest 설정 파일                        |
| setupTests.js     | jest 테스트 환경을 설정하기 위한 파일 |
| tsconfig.json     | typescript 설정 파일                  |
| webpack.config.js | webpack 설정 파일                     |

## 과제 요구사항

- **테이블 관련 라이브러리 사용 금지**: 예를 들어 `react-table`과 같은 외부 라이브러리는 사용할 수 없습니다.
- **Checkbox**: 각 행에 체크박스를 추가합니다.
- **Infinite Scroll**: 데이터를 스크롤 시 무한으로 로드할 수 있어야 합니다.
- **Sorting**: 컬럼별 정렬 기능을 제공합니다.
- **Search**: 검색 기능을 제공합니다.
  - 검색 기능은 그리드 외부에 위치하여, 데이터와 연동되어야 합니다.
- **Rows**: 최소 **100개 이상**의 데이터를 컨트롤 할 수 있어야 합니다.
- **Columns**: 데이터 표현을 위한 컬럼을 정의합니다.
  - 컬럼은 상기 API 데이터를 기반으로 자유롭게 설정해주세요.
- **Tooltip**: 테이블 셀의 영역보다 넓은 데이터일 경우 셀에 마우스오버 시 툴팁으로 전체 내용을 보여주세요.
- **Sub Rows:** 테이블 행 클릭 시 `address` 데이터를 세부행으로 보여주세요.

## 문제 해결 방식

- **테이블 관련 라이브러리 사용 금지**: 예를 들어 `react-table`과 같은 외부 라이브러리는 사용할 수 없습니다.

  -> React로만 구현했습니다.

- **Checkbox**: 각 행에 체크박스를 추가합니다.

  -> 추가 완료했습니다.

- **Infinite Scroll**: 데이터를 스크롤 시 무한으로 로드할 수 있어야 합니다.

  -> window, mac 환경에서 동일하게 동작하도록 구현했습니다.

- **Sorting**: 컬럼별 정렬 기능을 제공합니다.

  -> 올림차순, 내림차순 sorting 으로 정렬 기능 구현했습니다.

- **Search**: 검색 기능을 제공합니다.

  - 검색 기능은 그리드 외부에 위치하여, 데이터와 연동되어야 합니다.

  -> 어떤 검색어로 검색이 되게 할지 정해진게 없어 `firstName LastName` 을 합친 Name으로 검색되도록 구현했습니다.

- **Rows**: 최소 **100개 이상**의 데이터를 컨트롤 할 수 있어야 합니다.

  -> 100개 이상 데이터에서도 sort, search, infinite scroll 구현했습니다.

- **Columns**: 데이터 표현을 위한 컬럼을 정의합니다.
  - 컬럼은 상기 API 데이터를 기반으로 자유롭게 설정해주세요.
- **Tooltip**: 테이블 셀의 영역보다 넓은 데이터일 경우 셀에 마우스오버 시 툴팁으로 전체 내용을 보여주세요.

  -> 구현 시 긴 데이터가 없어 모든 항목 hover 시 툴팁 나오도록 구현했습니다.

- **Sub Rows:** 테이블 행 클릭 시 `address` 데이터를 세부행으로 보여주세요.

  -> 펼치기 버튼 클릭 시 세부 행 노출 되도록 구현했습니다.

## 미비사항 및 후기

- jest 를 활용한 테스트 기능을 추가하였으나 몇몇 case 가 정상적으로 success 되지 않아 기회가 된다면 더 좋은 방안으로 구현해보고 싶습니다.

- 프론트엔드 개발자로서 기회가 된다면 디자인 리팩토링을 구현해보고 싶습니다.
