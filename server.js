const request=require('request');//for sending HTTP request to URL
const cheerio=require('cheerio');//for DOM parsing and extraction of HTML webpage 
const fs=require('fs');//for reading or writing the data into file

const URL = "https://www.flipkart.com/search?q=mobiles";
request;

request(URL,function(err,res,body){
	if(err)
		console.log(err,"Error on requesting the URL");
	else{
		const arr=[];
		let $=cheerio.load(body);
		
		//check Inspect element in the browser to change the div class
		$('div._1HmYoV > div.bhgxx2>div._3O0U0u').each(function(index){
			const data=$(this).find('div._1UoZlX>a').attr('href');
			const name=$(this).find('div._1-2Iqu>div.col-7-12>div._3wU53n').text();
			const obj={data:data,name:name};
			console.log(obj);
			arr.push(JSON.stringify(obj));
		});
		console.log(arr.toString());
		console.log("\n");
		fs.writeFile('data.txt',arr,function(err){
			if (err)
				console.log(err);
			else
				console.log("Success");
		});
	}
});