export function loadJsFile(urlStr:string) {
    /** loadJsFile **/
    return new Promise((resolve, reject) => {
        try{
          let script = document.createElement('script')
          script.onload = (res) => {
            console.log(res);
            resolve('onload');
          }
          script.onerror = (res) =>{
            console.log(res);
            reject("onerror");
          }
          script.async = true
          script.src = urlStr;
          document.head.appendChild(script)
        } catch(err){
          console.error("loadKakaoJs load process error,");
        }
        
      })
}