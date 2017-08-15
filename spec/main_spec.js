"use strict";
var _ = require("lodash");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var m = require("../lib/main.js");
var codePost = m.codePost;
var splitCode = m.splitCode;
var addCheckCode = m.addCheckCode;
var translateIt = m.translateIt;
var translateEach = m.translateEach;
var splitPost = m.splitPost;
var checkCode = m.checkCode;
var reTranslateIt = m.reTranslateIt;
var reTranslateEach = m.reTranslateEach;
var decodePost = m.decodePost;

describe("测试描述", function(){
    sinon.spy(console, 'log');

    it("测试对邮编进行编码的总操作-5位", function(){
        
        var result = codePost('95713').toString();
        var expect_str_array = ['|', '|', ':', '|', ':', ':', 
                              ':', '|', ':', '|', ':',
                              '|', ':', ':', ':', '|',
                              ':', ':', ':', '|', '|',
                              ':', ':', '|', '|', ':',
                              ':', '|', ':', '|', ':',
                              '|'].toString();
        
        expect(expect_str_array).to.equal(result);
    });

    it("测试对邮编进行编码的总操作-9位", function(){
        
        var result = codePost('555551237').toString();
        var expect_str_array = ['|', 
                              ':', '|', ':', '|', ':',
                              ':', '|', ':', '|', ':',
                              ':', '|', ':', '|', ':',
                              ':', '|', ':', '|', ':',
                              ':', '|', ':', '|', ':',
                              ':', ':', ':', '|', '|',
                              ':', ':', '|', ':', '|',
                              ':', ':', '|', '|', ':',
                              '|', ':', ':', ':', '|',
                              ':', ':', '|', ':', '|',
                              '|'].toString();
        
        expect(expect_str_array).to.equal(result);
    });

    it("测试对邮编进行编码的总操作-10位", function(){
        
        var result = codePost('55555-1237').toString();
        var expect_str_array = ['|', 
                              ':', '|', ':', '|', ':',
                              ':', '|', ':', '|', ':',
                              ':', '|', ':', '|', ':',
                              ':', '|', ':', '|', ':',
                              ':', '|', ':', '|', ':',
                              ':', ':', ':', '|', '|',
                              ':', ':', '|', ':', '|',
                              ':', ':', '|', '|', ':',
                              '|', ':', ':', ':', '|',
                              ':', ':', '|', ':', '|',
                              '|'].toString();
        
        expect(expect_str_array).to.equal(result);
    });

    it("测试将编码分解为数字数组5（编码不含-）", function(){

        var result = splitCode('95713').toString();
        var expect_num_array = [9, 5, 7, 1, 3].toString();
        
        expect(expect_num_array).to.equal(result);
    });          

    it("测试将编码分解为数字数组9（编码不含-）", function(){

        var result = splitCode('555551237').toString();
        var expect_num_array = [5, 5, 5, 5, 5, 1, 2, 3, 7].toString();
        
        expect(expect_num_array).to.equal(result);
    });
    
    it("测试将编码分解为数字数组10（编码含-）", function(){

        var result = splitCode('55555-1237').toString();
        var expect_num_array = [5, 5, 5, 5, 5, 1, 2, 3, 7].toString();
        
        expect(expect_num_array).to.equal(result);
    });
    
    it("测试checkCode5", function(){
        var code = [9, 5, 7, 1, 3];
        var result = addCheckCode(code).toString();
        var expect_num_array = [9, 5, 7, 1, 3, 5].toString();
        
        expect(expect_num_array).to.equal(result);
    });
    
    it("测试checkCode9", function(){
        var code = [5, 5, 5, 5, 5, 1, 2, 3, 7];
        var result = addCheckCode(code).toString();
        var expect_num_array = [5, 5, 5, 5, 5, 1, 2, 3, 7, 2].toString();
        
        expect(expect_num_array).to.equal(result);
    });
    
    it("测试将邮编数字数组翻译为编码5(加上校验)", function(){
        var result = translateIt([9, 5, 7, 1, 3, 5]).toString();
        var expect_num_array = ['|', '|', ':', '|', ':', ':', 
                              ':', '|', ':', '|', ':',
                              '|', ':', ':', ':', '|',
                              ':', ':', ':', '|', '|',
                              ':', ':', '|', '|', ':',
                              ':', '|', ':', '|', ':',
                              '|'].toString();
        expect(expect_num_array).to.equal(result);
    });
    
    it("测试将邮编数字数组翻译为编码9(加上校验)", function(){
        
        var result = translateIt([5, 5, 5, 5, 5, 1, 2, 3, 7, 2]).toString();
        var expect_num_array = ['|', 
                              ':', '|', ':', '|', ':',
                              ':', '|', ':', '|', ':',
                              ':', '|', ':', '|', ':',
                              ':', '|', ':', '|', ':',
                              ':', '|', ':', '|', ':',
                              ':', ':', ':', '|', '|',
                              ':', ':', '|', ':', '|',
                              ':', ':', '|', '|', ':',
                              '|', ':', ':', ':', '|',
                              ':', ':', '|', ':', '|',
                              '|'].toString();
        expect(expect_num_array).to.equal(result);
    });
    
    it("测试将单个数字转换为对应的编码", function(){

        var rsl = 8
        var rsll = translateEach(rsl);
        var result = rsll.toString();
        var expect_str_array;
        if(rsl === 1){
                  expect_str_array= [':', ':', ':', '|', '|'].toString();
        }
        if(rsl === 2){
                  expect_str_array= [':', ':', '|', ':', '|'].toString();
        }
        if(rsl === 3){
                  expect_str_array= [':', ':', '|', '|', ':'].toString();
        }
        if(rsl === 4){
                  expect_str_array= [':', '|', ':', ':', '|'].toString();
        }
        if(rsl === 5){
                  expect_str_array= [':', '|', ':', '|', ':'].toString();
        }
        if(rsl === 6){
                  expect_str_array= [':', '|', '|', ':', ':'].toString();
        }
        if(rsl === 7){
                  expect_str_array= ['|', ':', ':', ':', '|'].toString();
        }
        if(rsl === 8){
                  expect_str_array= ['|', ':', ':', '|', ':'].toString();
        }
        if(rsl === 9){
                  expect_str_array= ['|', ':', '|', ':', ':'].toString();
        }
        if(rsl === 0){
                  expect_str_array= ['|', '|', ':', ':', ':'].toString();
        }
        
        expect(expect_str_array).to.equal(result);
    });
    
    it("测试将表示同一个数字的编码分为一组5", function(){
        var arg = ['|', '|', ':', '|', ':', ':', 
                              ':', '|', ':', '|', ':',
                              '|', ':', ':', ':', '|',
                              ':', ':', ':', '|', '|',
                              ':', ':', '|', '|', ':',
                              ':', '|', ':', '|', ':',
                              '|']
        var result = splitPost(arg).toString();
        var expect_str_array = [['|', ':', '|', ':', ':'], 
                              [':', '|', ':', '|', ':'],
                              ['|', ':', ':', ':', '|'],
                              [':', ':', ':', '|', '|'],
                              [':', ':', '|', '|', ':'],
                              [':', '|', ':', '|', ':']].toString();
        
        expect(expect_str_array).to.equal(result);
    });
    
    it("测试将表示同一个数字的编码分为一组9", function(){
        var arg = ['|', 
                              ':', '|', ':', '|', ':',
                              ':', '|', ':', '|', ':',
                              ':', '|', ':', '|', ':',
                              ':', '|', ':', '|', ':',
                              ':', '|', ':', '|', ':',
                              ':', ':', ':', '|', '|',
                              ':', ':', '|', ':', '|',
                              ':', ':', '|', '|', ':',
                              '|', ':', ':', ':', '|',
                              ':', ':', '|', ':', '|',
                              '|']
        var result = splitPost(arg).toString();
        var expect_str_array = [[':', '|', ':', '|', ':'],
                              [':', '|', ':', '|', ':'],
                              [':', '|', ':', '|', ':'],
                              [':', '|', ':', '|', ':'],
                              [':', '|', ':', '|', ':'],
                              [':', ':', ':', '|', '|'],
                              [':', ':', '|', ':', '|'],
                              [':', ':', '|', '|', ':'],
                              ['|', ':', ':', ':', '|'],
                              [':', ':', '|', ':', '|']].toString();


        expect(expect_str_array).to.equal(result);

    });
    
    it("测试对编码进行校验并去掉校验码5", function(){
        var arg = [['|', ':', '|', ':', ':'], 
                              [':', '|', ':', '|', ':'],
                              ['|', ':', ':', ':', '|'],
                              [':', ':', ':', '|', '|'],
                              [':', ':', '|', '|', ':'],
                              [':', '|', ':', '|', ':']];
        var result = checkCode(arg).toString();
        var expect_str_array = [['|', ':', '|', ':', ':'], 
                              [':', '|', ':', '|', ':'],
                              ['|', ':', ':', ':', '|'],
                              [':', ':', ':', '|', '|'],
                              [':', ':', '|', '|', ':']].toString();
        
        expect(expect_str_array).to.equal(result);
    });
    
    it("测试对编码进行校验并去掉校验码9", function(){
        var arg = [[':', '|', ':', '|', ':'],
                              [':', '|', ':', '|', ':'],
                              [':', '|', ':', '|', ':'],
                              [':', '|', ':', '|', ':'],
                              [':', '|', ':', '|', ':'],
                              [':', ':', ':', '|', '|'],
                              [':', ':', '|', ':', '|'],
                              [':', ':', '|', '|', ':'],
                              ['|', ':', ':', ':', '|'],
                              [':', ':', '|', ':', '|']];
        var result = checkCode(arg).toString();
        var expect_str_array = [[':', '|', ':', '|', ':'],
                              [':', '|', ':', '|', ':'],
                              [':', '|', ':', '|', ':'],
                              [':', '|', ':', '|', ':'],
                              [':', '|', ':', '|', ':'],
                              [':', ':', ':', '|', '|'],
                              [':', ':', '|', ':', '|'],
                              [':', ':', '|', '|', ':'],
                              ['|', ':', ':', ':', '|']].toString();
        
        expect(expect_str_array).to.equal(result);
  });
  
     it("测试将处理过的编码解码为邮编5", function(){
        var arg = [['|', ':', '|', ':', ':'], 
                              [':', '|', ':', '|', ':'],
                              ['|', ':', ':', ':', '|'],
                              [':', ':', ':', '|', '|'],
                              [':', ':', '|', '|', ':']];
        var result = reTranslateIt(arg).toString();
        var expect_string = '95713';
        
        expect(expect_string).to.equal(result);
    });

it("测试将处理过的编码解码为邮编9", function(){
        var arg = [[':', '|', ':', '|', ':'],
                              [':', '|', ':', '|', ':'],
                              [':', '|', ':', '|', ':'],
                              [':', '|', ':', '|', ':'],
                              [':', '|', ':', '|', ':'],
                              [':', ':', ':', '|', '|'],
                              [':', ':', '|', ':', '|'],
                              [':', ':', '|', '|', ':'],
                              ['|', ':', ':', ':', '|']];
        var result = reTranslateIt(arg).toString();
        var expect_string = '55555-1237';
        
        expect(expect_string).to.equal(result);
    });

    it("测试将每一组编码转换为相应的数字", function(){
        var arg = [':', '|', ':', '|', ':'];
        var result = reTranslateEach(arg)
        
        var expect_num = 5;
               
        expect(expect_num).to.equal(result);
    });

    it("测试将编码转换为邮编的总操作9", function(){
              var arg = ['|', 
                              ':', '|', ':', '|', ':',
                              ':', '|', ':', '|', ':',
                              ':', '|', ':', '|', ':',
                              ':', '|', ':', '|', ':',
                              ':', '|', ':', '|', ':',
                              ':', ':', ':', '|', '|',
                              ':', ':', '|', ':', '|',
                              ':', ':', '|', '|', ':',
                              '|', ':', ':', ':', '|',
                              ':', ':', '|', ':', '|',
                              '|'];
          var result = decodePost(arg);
          var expect_result_string = '55555-1237';
          expect(expect_result_string).to.equal(result);
    });
    
        it("测试将编码转换为邮编的总操作5", function(){
	var arg = ['|', '|', ':', '|', ':', ':', 
                              ':', '|', ':', '|', ':',
                              '|', ':', ':', ':', '|',
                              ':', ':', ':', '|', '|',
                              ':', ':', '|', '|', ':',
                              ':', '|', ':', '|', ':',
                              '|']
        var result = decodePost(arg);
	var expect_result_string = '95713';
	expect(expect_result_string).to.equal(result);
    });
});