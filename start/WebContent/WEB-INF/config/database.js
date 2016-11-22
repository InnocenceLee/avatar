
// var datasourceConfig = {
//	driverClassName: "org.postgresql.Driver", 
//	url: "jdbc:postgresql://121.40.216.238:5432/start3",
//	username: "start", 
//	password: "DT7Y1We^&i5md!pm",
//	initConnectionSqls: "set time zone 'UTC';",
//	maxActive:10, 
//	maxIdle:5,
//	maxWait: 10000,
//};



var datasourceConfig = {
	driverClassName: "org.postgresql.Driver", 
	url: "jdbc:postgresql://localhost:5432/elearning",
	username: "postgres", 
	password: "lijiang",
	initConnectionSqls: "set time zone 'UTC';",
	maxActive: 100, 
	maxIdle: 30,
	maxWait: 10000,
};

//var datasourceConfig = {
//    isMongodb: true,
//    url: "localhost:27017",
//    database: 'test',
//}


