function codePost(code){
          let nums = splitCode(code), arr = [];
          let numbers = addCheckCode(nums);
          arr = translateIt(numbers);
          return arr;
}

function splitCode(str){
          let array = str.split('');
          let numArray = []
          let index = array.indexOf('-');
          if(index !== -1){
                    array.splice(index, 1);
          }
          for(let each of array){
                    numArray.push(parseInt(each, 10));
          }
          return numArray;
}

function addCheckCode(arr){
          let total = arr.reduce(function(a, b){
                    return a + b;
          }, 0);
          let add = 10 - (total % 10);
          let array = arr.concat([parseInt(add, 10)]);
          return array;
}

function translateIt(nums){
          let arr = ['|'];
          for(let i = 0; i < nums.length; i++){                    
                    arr = arr.concat(translateEach(nums[i]));
          }
          arr.push('|')
          return arr;
}

function translateEach(num){
          let array;
          if(num === 1){
                    array= [':', ':', ':', '|', '|'];
          }
          if(num === 2){
                    array= [':', ':', '|', ':', '|'];
          }
          if(num === 3){
                    array= [':', ':', '|', '|', ':'];
          }
          if(num === 4){
                    array= [':', '|', ':', ':', '|'];
          }
          if(num === 5){
                    array= [':', '|', ':', '|', ':'];
          }
          if(num === 6){
                    array= [':', '|', '|', ':', ':'];
          }
          if(num === 7){
                    array= ['|', ':', ':', ':', '|'];
          }
          if(num === 8){
                    array= ['|', ':', ':', '|', ':'];
          }
          if(num === 9){
                    array= ['|', ':', '|', ':', ':'];
          }
          if(num === 0){
                    array= ['|', '|', ':', ':', ':'];
          }
          return array;
}

function main(){
    
}

function splitPost(post){
          let newPost = post.slice(1, post.length - 1);
          let result = [];
          for(let i = 0; i < newPost.length; i += 5){
                    let buffer = [newPost[i], newPost[i + 1], newPost[i + 2], newPost[i + 3], newPost[i + 4]];
                    result.push(buffer);
          }
          return result;
}

function checkCode(repo){
          let newrepo = repo.slice(0, repo.length -1);
          return newrepo;
}

function reTranslateIt(repo){
          let string = '';
          for(let each of repo){
                    let str = reTranslateEach(each);
                    string += str;
          }
          if(string.length > 5){
                    let str1 = string.slice(0, 5);
                    let str2 = string.slice(5);
                    let buffer = ['-'];
                    string = str1.concat(buffer, str2);
          }
          return string;
}

function reTranslateEach(str){
          let string = str.toString();
          let number;
          if(string === [':', ':', ':', '|', '|'].toString()){
                    number = 1;
          }
          if(string === [':', ':', '|', ':', '|'].toString()){
                    number = 2;
          }
          if(string === [':', ':', '|', '|', ':'].toString()){
                    number = 3;
          }
          if(string === [':', '|', ':', ':', '|'].toString()){
                    number = 4;
          }
          if(string === [':', '|', ':', '|', ':'].toString()){
                    number = 5;
          }
          if(string === [':', '|', '|', ':', ':'].toString()){
                    number = 6;
          }
          if(string === ['|', ':', ':', ':', '|'].toString()){
                    number = 7;
          }
          if(string === ['|', ':', ':', '|', ':'].toString()){
                    number = 8;
          }
          if(string === ['|', ':', '|', ':', ':'].toString()){
                    number = 9;
          }
          if(string === ['|', '|', ':', ':', ':'].toString()){
                    number = 0;
          }
          
          return number;
}

function decodePost(post){
          let repo = splitPost(post);
          let rrepo = checkCode(repo);
          let code = reTranslateIt(rrepo);
          return code;
}

module.exports = {main:main, codePost:codePost, splitCode:splitCode, translateIt:translateIt, 
          translateEach:translateEach, addCheckCode:addCheckCode, splitPost:splitPost, checkCode:checkCode,
          reTranslateIt:reTranslateIt, reTranslateEach:reTranslateEach, decodePost:decodePost};
