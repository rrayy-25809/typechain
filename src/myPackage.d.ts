interface Config {

}

declare module "myPackage" { //`myPackage` 라는 이름의 모듈 설정
    function init(config:Config): Boolean;
    function exit(code:number): number
}