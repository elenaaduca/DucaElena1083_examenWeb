import Sequelize from 'sequelize';
const PORT = process.env.PORT || 3000;


const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './examen.db',
	define: {
		timestamps: false
	}
});


//o	Definirea primei entități
const Article = sequelize.define('article', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement:true
	},
	titlu: {
		type: Sequelize.STRING,
		validate:{
			min:2
		}
	},
	rezumat:{
		type: Sequelize.STRING,
		validate:{
			min:10
		}
	},
	data: {
		type: Sequelize.DATE
	}	
});

//o	Definire celei de-a doua entități

const Reference = sequelize.define('reference', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement:true
	},
	titlu: {
		type: Sequelize.STRING,
		validate:{
			min:5
		}
	},
	data: {
		type: Sequelize.DATEONLY
	},
	autori:{
		type: Sequelize.STRING
	}

});


//o	Definirea relației dintre cele două entități

Article.hasMany(Reference, {foreignKey: 'articleId'});
Reference.belongsTo(Article, {foreignKey: 'articleId'});

async function initialize() {
	await sequelize.authenticate();
	await sequelize.sync({alter: true});
	//await sequelize.sync();
}

export {
	initialize,
	Article, Reference
}