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


