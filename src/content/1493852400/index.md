---
title: "REST APIを取得するクライアントをJerseyで作る"
date: 2017-05-04 08:00 +0900
---

## Jerseyとは？
> Jersey RESTful Web Servicesフレームワークは、JAX-RS APIのサポートを提供し、JAX-RS（JSR 311およびJSR 339）リファレンス実装として機能する、JavaでRESTfulなWebサービスを開発するための、オープンソースで実動品質のフレームワークです。(https://jersey.java.net)

すごく雑に説明すると、REST APIからデータを取得するアプリケーションをJavaで簡単に作るためのライブラリ。労力抑え目でREST APIをどうこうしたい時に便利。

## インストール
Mavenを使用する場合は、以下のdependencyを追加する。

```xml
<dependency>
  <groupId>com.sun.jersey</groupId>
  <artifactId>jersey-client</artifactId>
  <version>1.19.3</version>
</dependency>
```

## REST APIからデータを取得する
使い方としては、ざっくり以下の3ステップでいける。

* Clientのインスタンスを生成する
* Client#resourceでデータを取得する。引数にはAPIのURLを指定する
* WebResource#getでJSON形式のデータを取り出す

コードに起こすと以下のような感じ。

```java
final Client client = Client.create();
final WebResource resource = client.resource("https://api.github.com/repos/spring-projects/spring-boot/issues");
final String json = resource.get(String.class);
```

## JSONを任意のDTOにデシリアライズする
ここでは、JSONパーサーライブラリのJacksonを使う。  

- https://github.com/FasterXML/jackson

まずはMavenのdependencyを追加して、

```xml
<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
  <version>2.8.8</version>
</dependency>
```

任意のDTOを作って、

```java
@JsonIgnoreProperties(ignoreUnknown=true)
public class GitHubApiResponseDto {
    private String title;
    private String body;

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getBody() {
        return body;
    }
    public void setBody(String body) {
        this.body = body;
    }
}
```

ObjectMapper#readValueすればOK。

```java
final ObjectMapper mapper = new ObjectMapper();
List<GitHubApiResponseDto> results = new ArrayList<GitHubApiResponseDto>();
results = Arrays.asList(mapper.readValue(json, GitHubApiResponseDto[].class));
```

readValueメソッドはIOException、JsonParseException、JsonMappingExceptionをスローするので、適宜処理してください。

## 配布用Jarを作る
続いて、jarファイル単品で動作するよう、配布用のjarファイルをビルドする。  
こちらも特に複雑なことはなくて、素直にmaven-assembly-pluginを使います。mainClassは各自の環境に応じて書き換えてください。

```xml
<build>
    <plugins>
        <plugin>
            <artifactId>maven-assembly-plugin</artifactId>
            <version>2.2</version>
            <executions>
                <execution>
                    <id>make-assembly</id>
                    <phase>package</phase>
                    <goals>
                        <goal>single</goal>
                    </goals>
                </execution>
            </executions>
            <configuration>
                <descriptorRefs>
                    <descriptorRef>jar-with-dependencies</descriptorRef>
                </descriptorRefs>
                <archive>
                    <manifest>
                        <mainClass>com.inmotion.Main</mainClass>
                    </manifest>
                </archive>
            </configuration>
        </plugin>
    </plugins>
</build>
```

あとは、mvn packageコマンドを実行してビルド実行。「(プロジェクト名)-jar-with-dependencies.jar」が作成されれば成功です。お疲れ様でした。

## リポジトリ
- https://github.com/gushernobindsme/apiclient

## 参考
- [HTTPクライアントとして使うjersey-client](https://www.akirakoyasu.net/2012/02/05/jerey-client-useful-http-client/)
- [Jackson使い方メモ - Qiita](https://qiita.com/opengl-8080/items/b613b9b3bc5d796c840c)