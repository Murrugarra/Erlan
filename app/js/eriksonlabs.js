/*
  Erikson Murrugarra Sifuentes. 
  Erikson Programming Language. v.0.1.
  CEO & Founder at Laboratorios Erikson.
  CEO & Founder at Light Agile Solutions.
  Erlang, Python, Lisp Hacker.
  
  Eres libre de utilizar, modificar y difundir éste código 
  anteponiendo los créditos de su autor.

  octubre - 2013
*/
var eTp={
	alertar: '<div class="alert elements">@text</div>',
	mostrar: '<div class="show elements">@text</div>',
	responder: '<div class="response elements">@text</div>',
	preguntar: '<div class="pregunta elements">'+
				'<label>@text</label>'+
				' <input type="text" class="entrada" />'+
				'</div>',
	error: '<a class="btne error" onclick="textAce.gotoLine(@line)">'+
		   '<span>Ln. @line: </span><span>@text.</span></a>'
}
var eUtils={
	replaceAll: function(find, replace, str){		
  		return str.replace(new RegExp(find, 'g'), replace);	
	}
}
var eCs={
	   __INICIO__ : 0x0001,
	      __FIN__ : 0x0002,
	 __PREGUNTA__ : 0x0003,
	 __RESPONDE__ : 0x0004,
	   __GUARDA__ : 0x0005,
	   __ALERTA__ : 0x0006,
	        __Y__ : 0x0007,
	        __O__ : 0x0008,
	      __CON__ : 0x0009,
	     __SINO__ : 0x000A,
	    __FINSI__ : 0x00A1,
	   __VERDAD__ : 0x00A2,
	    __FALSO__ : 0x00A3,
	       __NO__ : 0x00A4,
	  __REPETIR__ : 0x00A5,
	 __MIENTRAS__ : 0x00A6,
	    __HACER__ : 0x00A4,
	  __MOSTRAR__ : 0x00BB,
	       __CADENA__  : 100,
	 __IDENTIFICADOR__ : 101,
	 	    __NUMERO__ : 102,
	 __IGUAL__ : 200,
	  __DPTS__ : 201,
	 __PARIZ__ : 300,
	 __PARDE__ : 301,
	  __LLIZ__ : 302,
	  __LLDE__ : 303,
	   __MAS__ : 304,
	   __POR__ : 305,
	   __MEN__ : 306,
	   __DIV__ : 307,
	   __RES__ : 308,
	            __SI__ : 400,
	   __SONIGUALES__  : 401,
	 __SONDIFERENTES__ : 402,
	       __ESMAYOR__ : 403,
	       __ESMENOR__ : 404,
	  __ESMAYORIGUAL__ : 405,
	  __ESMENORIGUAL__ : 406,
	       __ESFALSO__ : 407,
	      __ESVERDAD__ : 408,
	      __MICHI__: 500
}
var Erikson=function(){
	return {
		/* variables operativas */
		eIndex:  0x0000,
		eLine:   0x0001,
		eString: '',
		eLength: 0x0000,
		eFollow: true, /* Indica que se puede seguir con la ejecución del programa *T
		/* memoria */
		eResults: undefined, /* donde poner los resultados label */
		ePasada: 0x0001, /* pasadas del interprete 1. sintaxis 2. ejecucion*/
		eErrorLog: '',
		eErrorer: undefined,
		eErrContent: undefined,
		Memory: {
			eEntry: [],
			fnEriksonDeallocateMemory: function(memory){				
				this.eEntry=[];
				console.log("Memoria iniciada");
			},
			fnEriksonAddEntry: function(key, value){
				this.eEntry[key]=value;
			},
			fnEriksonGetEntry: function(key){
				return this.eEntry[key];
			}
		},
		/* tabla de simbolos del interprete */
		SymTab: { 
			eKeywords: [],	
			oAsciiTab: [],	
			fnEriksonLoadTable: function(){
				this.eKeywords["inicio"]    	= eCs.__INICIO__;
				this.eKeywords["fin"]       	= eCs.__FIN__;
				this.eKeywords["preguntar"]   	= eCs.__PREGUNTA__;
				this.eKeywords["responder"]   	= eCs.__RESPONDE__;
				this.eKeywords["guarda"]    	= eCs.__GUARDA__;
				this.eKeywords["alertar"]   	= eCs.__ALERTA__;
				this.eKeywords["si"]      		= eCs.__SI__;
				this.eKeywords["soniguales"]  	= eCs.__SONIGUALES__;
				this.eKeywords["sondiferentes"] = eCs.__SONDIFERENTES__;  
				this.eKeywords["esmayor"]       = eCs.__ESMAYOR__;
				this.eKeywords["esmenor"]       = eCs.__ESMENOR__;
				this.eKeywords["esmayorigual"]  = eCs.__ESMAYORIGUAL__;
				this.eKeywords["esmenorigual"]  = eCs.__ESMENORIGUAL__;
				this.eKeywords["esverdad"]     	= eCs.__ESVERDAD__;
				this.eKeywords["esfalso"]     	= eCs.__ESFALSO__;
				this.eKeywords["VERDAD"]    	= eCs.__VERDAD__;
				this.eKeywords["FALSO"]     	= eCs.__FALSO__;
				this.eKeywords["con"]       	= eCs.__CON__;
				this.eKeywords["or"]       		= eCs.__O__;
				this.eKeywords["and"]       	= eCs.__Y__;
				this.eKeywords["sino"]      	= eCs.__SINO__;
				this.eKeywords["finsi"]     	= eCs.__FINSI__;
				this.eKeywords["no"]      		= eCs.__NO__;
				this.eKeywords["repetir"]     	= eCs.__REPETIR__;
				this.eKeywords["mientras"]    	= eCs.__MIENTRAS__;
				this.eKeywords["hacer"]     	= eCs.__HACER__;
				this.eKeywords["mostrar"]     	= eCs.__MOSTRAR__;
		 	    console.log("Tabla de Simbolos Iniciada");
		 	    this.oAsciiTab["="] = eCs.__IGUAL__;
				this.oAsciiTab["("] = eCs.__PARIZ__;
				this.oAsciiTab[")"] = eCs.__PARDE__;
				this.oAsciiTab["]"] = eCs.__LLDE__;
				this.oAsciiTab["["] = eCs.__LLIZ__;
				this.oAsciiTab[":"] = eCs.__DPTS__;
				this.oAsciiTab["+"] = eCs.__MAS__;
				this.oAsciiTab["*"] = eCs.__POR__;
				this.oAsciiTab["-"] = eCs.__MEN__;
				this.oAsciiTab["/"] = eCs.__DIV__;
				this.oAsciiTab["%"] = eCs.__RES__; 
				this.oAsciiTab["#"] = eCs.__MICHI__; 
				console.log("Tabla Ascii Iniciada");
			},
			fnSearch: function(string){
				if(this.eKeywords[string]==undefined)
					this.eKeywords[string]=eCs.__IDENTIFICADOR__;
				return this.eKeywords[string];
			}
		},		
		/* Interprete del sistema */
		Interpreter:{ 
			eErikson: undefined,
			eSuccess: true,
			eRequireLimits: true,		/* poner inicio y fin */				
			/* Analizador Léxico */
			LexicalAnalyzer: {
				eErikson: undefined,
				fnEriksonInitLexicalAnalizer: function(erikson){
					this.eErikson=erikson;
					console.log("Analizador léxico iniciado");
				},
				fnEriksonAnalex: function(){ //analex
					var eChar='';
					var eLexema="";
					while(this.eErikson.eIndex<this.eErikson.eLength){
						eChar=this.efnGetChar();
						// es cadena
						if(this.efnEsCaracter(eChar)){
							do{
								eLexema+=eChar;							
							}
							while(this.efnEsCaracterNum((eChar=this.efnGetChar())));
							this.efnBackChar();
							return this.efnCreateToken(eLexema, this.eErikson.SymTab.fnSearch(eLexema))
						}
						else if(eChar==' ' || eChar=='\t'){;}
						else if(eChar=='\n'){
							this.eErikson.eLine++;
						}
						else if(!isNaN(eChar)){
							var numero="";
							do{
								numero+=eChar
							}
							while(!isNaN((eChar=this.efnGetChar())));
							this.efnBackChar();
							return this.efnCreateToken(eLexema, eCs.__NUMERO__, parseInt(numero));
						}
						else if(eChar=='#'){

							while((eChar=this.efnGetChar())!='\n'){
								;
							}
							console.log(eLexema)
							console.log(" Z " + eChar);
							this.eErikson.eLine++;
						}
						else if(eChar=='\"'){
							eLexema="";
							while((eChar=this.efnGetChar())!='\"'){
								eLexema+=eChar;
							}
							return this.efnCreateToken(eLexema, eCs.__CADENA__);
						}
						else{
							return this.efnCreateToken(eChar, this.eErikson.SymTab.oAsciiTab[eChar])
						}
					}
				},
				efnCreateToken: function(lexema, value, number){
					return {
						'lexema': lexema,
						'valor' : value,
						'numero': number,
						'cadena': lexema
					}
				},
				efnGetChar: function(){			
					// devuelve el caracter actual de la cadena		
					var tmp=this.eErikson.eString[this.eErikson.eIndex];
					this.eErikson.eIndex++;
					return tmp;
				},
				efnEsCaracter: function (c) {
					// devuelve verdadero si es caracter	
					return (c>='a' && c<='z') || (c>='A' && c <= 'Z');
				},
				efnEsCaracterNum: function(c){
					return this.efnEsCaracter(c) || (c>='0' && c<='9');
				},
				efnBackChar: function(){
					// retorna el carro en -1
					this.eErikson.eIndex--;
				}
			},
			/* Analizador Sintáctico */
			SintacticAnalyzer: {
				eErikson: undefined,
				eToken: undefined,
				fnEriksonInitSintacticAnalyzer: function(erikson){
					this.eErikson=erikson;
					console.log("Analizador Sintáctico Iniciado");
				},
				/* Arbol Sintáctico */
				fnEriksonAnalsin: function(){
					this.eToken=this.eErikson.Interpreter.LexicalAnalyzer.fnEriksonAnalex();
					// if extern requiere limites
					if(this.eErikson.Interpreter.eRequireLimits)
						this.fnErikson(eCs.__INICIO__);
					this.Syntax.fnEriksonInitSyntax(this);					
					return this.eErikson.Interpreter.eSuccess;
				},
				Syntax:{
					eTree: undefined,
					ePasada: 0,
					eCodeGen: undefined,
					eProgramsFunctions: [],
					fnEriksonInitSyntax: function(tree){
						this.eTree=tree;
						this.ePasada=this.eTree.eErikson.ePasada;						
						this.eCodeGen=this.eTree.eErikson.Interpreter.CodeGenerator;						
						this.fnEriksonProgram(true, this.ePasada==0x0001);												
					},
					fnEriksonProgram: function(ejecuta, first){
						switch(this.fnToken().valor){
							case eCs.__ALERTA__:
								this.flowEriksonAlerta(ejecuta, first);
								this.fnEriksonProgram(ejecuta, first);
								break;
							case eCs.__MOSTRAR__:
								this.flowEriksonMostrar(ejecuta, first);
								this.fnEriksonProgram(ejecuta, first);
								break;
							case eCs.__RESPONDE__:
								this.flowEriksonResponde(ejecuta, first);
								this.fnEriksonProgram(ejecuta, first);
								break;
							case eCs.__IDENTIFICADOR__:								
								this.flowEriksonAsignacion(ejecuta, first);								
								break;
							case eCs.__SI__:

								this.flowEriksonCondicional(ejecuta, first);
								this.fnEriksonProgram(ejecuta, first);
								break;
							case eCs.__REPETIR__:
								this.flowEriksonRepetir(ejecuta, first);
								this.fnEriksonProgram(ejecuta, first);
								break;		
							case eCs.__FIN__:
								if(this.eTree.eErikson.Interpreter.eRequireLimits)
									this.fnTree().fnErikson(eCs.__FIN__);
								break;
						}
					},
					flowEriksonRepetir: function(ejecuta, first){
						this.eTree.fnErikson(eCs.__REPETIR__);												
						this.eTree.fnErikson(eCs.__DPTS__);	
						var i=this.fnTree().eErikson.eIndex;
						var valor, cToken=this.eTree.eToken;							
						do{	
							this.fnEriksonProgram(ejecuta, first);
							this.eTree.fnErikson(eCs.__MIENTRAS__);
							valor=this.fnExpresionCondicion(first);
							if(valor==true){

								this.eTree.eToken=cToken;
								this.fnTree().eErikson.eIndex=i;								
							}							
						}while(valor==true && !first);

					},
					flowEriksonCondicional: function(ejecuta, first){
						
						this.eTree.fnErikson(eCs.__SI__);
						
						var valor=this.fnExpresionCondicion(first);								

						this.eTree.fnErikson(eCs.__DPTS__);						
						this.fnEriksonProgram(valor, first);
						if(this.fnToken().valor==eCs.__SINO__){
							this.eTree.fnErikson(eCs.__SINO__);
							this.eTree.fnErikson(eCs.__DPTS__);
							this.fnEriksonProgram(valor==false, first);
						}
						this.eTree.fnErikson(eCs.__FINSI__);
					},
					fnExpresionCondicion: function(first){
						
						var valor=this.fnTerminoCondicion(first);
						var resultado;
						
						while(this.fnToken().valor==eCs.__Y__ || this.fnToken().valor==eCs.__O__){
							
							switch(this.fnToken().valor){
								case eCs.__Y__:
									this.eTree.fnErikson(eCs.__Y__);
									resultado=this.fnTerminoCondicion(first);
									valor=(valor && resultado);
									break;
								case eCs.__O__:
									this.eTree.fnErikson(eCs.__O__);
									resultado=this.fnTerminoCondicion(first);
									valor=(valor || resultado);
									break;
							}
						}
						
						

						return first?false:valor;
					},
					fnTerminoCondicion: function(first){						
						var valor1, valor2, valor;	
				
						while(this.fnToken().valor==eCs.__SONIGUALES__ ||
							  this.fnToken().valor==eCs.__SONDIFERENTES__ ||
							  this.fnToken().valor==eCs.__ESMENOR__ ||
							  this.fnToken().valor==eCs.__ESMAYOR__ ||
							  this.fnToken().valor==eCs.__ESMENORIGUAL__ ||
							  this.fnToken().valor==eCs.__ESMAYORIGUAL__ ||
							  this.fnToken().valor==eCs.__ESVERDAD__ ||
							  this.fnToken().valor==eCs.__ESFALSO__ ||
							  this.fnToken().valor==eCs.__NO__){
							  
							switch(this.fnToken().valor){
								case eCs.__SONIGUALES__:

									this.eTree.fnErikson(eCs.__SONIGUALES__);
									this.eTree.fnErikson(eCs.__PARIZ__);
									valor1=this.fnFactorCondicion(first);
									this.eTree.fnErikson(eCs.__CON__);
									valor2=this.fnFactorCondicion(first);
									valor=valor1==valor2;
									this.eTree.fnErikson(eCs.__PARDE__);
									break;
								case eCs.__SONDIFERENTES__:
									this.eTree.fnErikson(eCs.__SONDIFERENTES__);
									this.eTree.fnErikson(eCs.__PARIZ__);
									valor1=this.fnFactorCondicion(first);
									this.eTree.fnErikson(eCs.__CON__);
									valor2=this.fnFactorCondicion(first);
									valor=valor1!=valor2;
									this.eTree.fnErikson(eCs.__PARDE__);
									break;
								case eCs.__ESMAYOR__:
									this.eTree.fnErikson(eCs.__ESMAYOR__);
									this.eTree.fnErikson(eCs.__PARIZ__);
									valor1=this.fnFactorCondicion(first);
									this.eTree.fnErikson(eCs.__CON__);
									valor2=this.fnFactorCondicion(first);
									valor=valor1>valor2;
									this.eTree.fnErikson(eCs.__PARDE__);
									break;
								case eCs.__ESMENOR__:
									this.eTree.fnErikson(eCs.__ESMENOR__);
									this.eTree.fnErikson(eCs.__PARIZ__);
									valor1=this.fnFactorCondicion(first);
									this.eTree.fnErikson(eCs.__CON__);
									valor2=this.fnFactorCondicion(first);
									valor=valor1<valor2;
									this.eTree.fnErikson(eCs.__PARDE__);
									break;
								case eCs.__ESMAYORIGUAL__:
									this.eTree.fnErikson(eCs.__ESMAYORIGUAL__);
									this.eTree.fnErikson(eCs.__PARIZ__);
									valor1=this.fnFactorCondicion(first);
									this.eTree.fnErikson(eCs.__CON__);
									valor2=this.fnFactorCondicion(first);
									valor=valor1>=valor2;
									this.eTree.fnErikson(eCs.__PARDE__);
									break;
								case eCs.__ESMENORIGUAL__:
									this.eTree.fnErikson(eCs.__ESMENORIGUAL__);
									this.eTree.fnErikson(eCs.__PARIZ__);
									valor1=this.fnFactorCondicion(first);
									this.eTree.fnErikson(eCs.__CON__);
									valor2=this.fnFactorCondicion(first);
									valor=valor1<=valor2;
									this.eTree.fnErikson(eCs.__PARDE__);
									break;
								case eCs.__ESVERDAD__:
									this.eTree.fnErikson(eCs.__ESVERDAD__);
									this.eTree.fnErikson(eCs.__PARIZ__);
									valor1=this.fnFactorCondicion(first);									
									this.eTree.fnErikson(eCs.__PARDE__);
									valor=valor1==true;
									break;	
								case eCs.__ESFALSO__:
									this.eTree.fnErikson(eCs.__ESFALSO__);
									this.eTree.fnErikson(eCs.__PARIZ__);
									valor1=this.fnFactorCondicion(first);									
									this.eTree.fnErikson(eCs.__PARDE__);
									valor=valor1==false;
									break;	
								case eCs.__NO__:
									this.eTree.fnErikson(eCs.__NO__);
									this.eTree.fnErikson(eCs.__PARIZ__);
									valor1=this.fnFactorCondicion(first);									
									this.eTree.fnErikson(eCs.__PARDE__);
									valor=valor1==false;
									break;
							}
						}
						return valor;
					},
					fnFactorCondicion: function(first){
						
						var valor;						
						switch(this.fnToken().valor){
							case eCs.__PARIZ__:
								this.eTree.fnErikson(eCs.__PARIZ__);
								valor=this.fnExpresionCondicion(first);
								this.eTree.fnErikson(eCs.__PARDE__);
								break;	
							case eCs.__NUMERO__:
								valor=this.fnToken().numero;
								this.eTree.fnErikson(eCs.__NUMERO__);
								break;
							case eCs.__IDENTIFICADOR__:								
								
								
								if(!first){					
									var mvalue=this.eTree.eErikson.Memory.fnEriksonGetEntry(this.fnToken().lexema);
									//console.log("my value ");
									console.log(mvalue.toString())
									
									
									console.log(valor);
									if(!isNaN(mvalue)){
										valor=parseInt(mvalue);
									}
									
									
								} 
								
								this.eTree.fnErikson(eCs.__IDENTIFICADOR__);								
								break;
							case eCs.__CADENA__:
								valor=this.fnToken().cadena;
								this.eTree.fnErikson(eCs.__CADENA__);
								break;
							case eCs.__VERDAD__:
								valor=true;
								this.eTree.fnErikson(eCs.__VERDAD__);
								break;
							case eCs.__FALSO__:
								valor=false;
								this.eTree.fnErikson(eCs.__FALSO__);
								break;
						}						
						return valor;
					},
					flowEriksonMostrar: function(ejecuta, first){
						this.eTree.fnErikson(eCs.__MOSTRAR__);
						var cad=this.fnToken().cadena;
						this.eTree.fnErikson(eCs.__CADENA__);						
						/* ejecución */
						if(ejecuta && !first)
							this.eCodeGen.fnEriksonExecMostrar(this.flowEriksonParseString(cad));
					},
					flowEriksonAlerta: function(ejecuta, first){						
						this.eTree.fnErikson(eCs.__ALERTA__);
						var cad=this.fnToken().cadena;
						this.eTree.fnErikson(eCs.__CADENA__);						
						/* ejecución */
						if(ejecuta && !first)
							this.eCodeGen.fnEriksonExecAlertar(this.flowEriksonParseString(cad));
					},	
					flowEriksonParseString: function(lexema){						
						var resp=lexema;	
						var i=lexema.indexOf("@"); // primera coincidencia						
						var tmp="";
						var j;
						var foll=true;
						if(i!=-1){
							while(i!=-1){
								console.log(i)
							;
							foll=true;
							tmp="";
						 	 j=i+1;
							while(j<lexema.length && foll){
								if((lexema[j]>='a' && lexema[j]<='z') || (lexema[j]>='0' && lexema[j]<='9')){
									tmp+=lexema[j]
								}
								else foll=false;
								j++;
							}
							resp=eUtils.replaceAll("@"+tmp, this.eTree.eErikson.Memory.fnEriksonGetEntry(tmp), resp);
							i=lexema.indexOf("@", j)
						}
						}
						else
							resp=lexema;

						return resp;

					},
					flowEriksonResponde: function(ejecuta, first){
						this.eTree.fnErikson(eCs.__RESPONDE__);
						var cad=this.fnToken().cadena;
						this.eTree.fnErikson(eCs.__CADENA__);						
						if(ejecuta && !first)
							this.eCodeGen.fnEriksonExecResponder(this.flowEriksonParseString(cad));
					},
					flowEriksonAsignacion: function(ejecuta, first){
						var left=this.fnToken().lexema;
						this.eTree.fnErikson(eCs.__IDENTIFICADOR__);
						this.eTree.fnErikson(eCs.__IGUAL__);
						
						switch(this.fnToken().valor){
							case eCs.__PREGUNTA__:								
								this.flowEriksonPregunta(left, ejecuta, first);
								if(first)
									this.fnEriksonProgram(ejecuta, first);
								break;
							case eCs.__CADENA__:
								var cadena=this.flowEriksonParseString(this.fnToken().cadena);								
								this.eTree.fnErikson(eCs.__CADENA__);								
								if(!first)
									this.eTree.eErikson.Memory.fnEriksonAddEntry(left, cadena);
								this.fnEriksonProgram(ejecuta, first);
								break;
							case eCs.__NUMERO__:
							case eCs.__PARIZ__:
							case eCs.__IDENTIFICADOR__:
								var res=this.fnExpresionOperacion();	
								if(!first)							
									this.eTree.eErikson.Memory.fnEriksonAddEntry(left, res);
								this.fnEriksonProgram(ejecuta, first);
								break;
						}
					},		
					fnExpresionOperacion: function(){
						var valor=this.fnTerminoOperacion();						
						while(this.fnToken().valor==eCs.__POR__ || 
							  this.fnToken().valor==eCs.__DIV__ ||
							  this.fnToken().valor==eCs.__RES__){
							switch(this.fnToken().valor){
								case eCs.__POR__:
									this.eTree.fnErikson(eCs.__POR__);
									valor*=this.fnTerminoOperacion();
									break;
								case eCs.__DIV__:
									this.eTree.fnErikson(eCs.__DIV__);
									valor/=this.fnTerminoOperacion();
									break;
								case eCs.__RES__:
									this.eTree.fnErikson(eCs.__RES__);
									valor%=this.fnTerminoOperacion();
									break;
							}
						}
						return valor;
					},		
					fnTerminoOperacion: function(){						
						var valor=this.fnFactorOperacion();						
						while(this.fnToken().valor==eCs.__MAS__ || 
							this.fnToken().valor==eCs.__MEN__){
							switch(this.fnToken().valor){
								case eCs.__MAS__:
									this.eTree.fnErikson(eCs.__MAS__);
									valor+=this.fnFactorOperacion();
									break;
								case eCs.__MEN__:
									this.eTree.fnErikson(eCs.__MEN__);
									valor-=this.fnFactorOperacion();
									break;
							}
						}
						return valor;
					},
					fnFactorOperacion: function(){
						var valor;
						var token=this.fnToken().valor;
						switch(token){
							case eCs.__NUMERO__:		
								valor=parseInt(this.fnToken().numero);						
								this.eTree.fnErikson(eCs.__NUMERO__);
								break;
							case eCs.__IDENTIFICADOR__:
								valor=parseInt(this.eTree.eErikson.Memory.fnEriksonGetEntry(this.fnToken().lexema));
								this.eTree.fnErikson(eCs.__IDENTIFICADOR__);
								break;
							case eCs.__PARIZ__:
								this.eTree.fnErikson(eCs.__PARIZ__);
								valor=this.fnExpresionOperacion();
								this.eTree.fnErikson(eCs.__PARDE__);
								break;
						}
						return valor;
					},
					flowEriksonPregunta: function(left, ejecuta, first){
						this.eTree.fnErikson(eCs.__PREGUNTA__);
						var cad=this.fnToken().cadena;						
						this.eTree.fnErikson(eCs.__CADENA__);
						if(ejecuta && !first)
							this.eCodeGen.fnEriksonExecPreguntar(left, this.flowEriksonParseString(cad), ejecuta);												
					},
					fnTree: function(){
						// analisis sintactico
						return this.eTree;
					},
					fnToken: function(){
						// obtiene el valor del token actual en Tree
						return this.eTree.eToken;
					}
				},
				/* Analisis Predictivo */
				fnErikson: function(expToken){
					if(this.eToken.valor==expToken)
						this.eToken=this.eErikson.Interpreter.LexicalAnalyzer.fnEriksonAnalex();
					else{
												 
						this.eErikson.eErrorLog+=eTp.error.replace("@line", this.eErikson.eLine).replace("@line", this.eErikson.eLine)
											              .replace("@text", "ei: " + this.eToken.valor + " - Esperado : " + expToken);
						console.log(this.eToken);
						console.log("ei: " + this.eToken.valor + " - Esperado : " + expToken)
						this.eErikson.Interpreter.eSuccess=false;
					}
				}
			},
			/* Ejecutador de Codigo */
			CodeGenerator: {
				eErikson: undefined,
				eConsole: undefined,
				fnEriksonInitCodeGenerator: function(erikson){
					console.log("Generador de código iniciado");
					this.eErikson=erikson;
					this.eConsole=$("#console");
					this.eConsole.html("");					
				},
				fnEriksonExecMostrar: function(cadena){
					this.eConsole.append(eTp.mostrar.replace("@text", cadena));
					this.fnRefreshUI();
				},
				fnEriksonExecAlertar: function(cadena){					
					this.eConsole.append(eTp.alertar.replace("@text", cadena));
					this.fnRefreshUI();
				},
				fnEriksonExecResponder: function(cadena){
					this.eConsole.append(eTp.responder.replace("@text", cadena));
					this.fnRefreshUI();
				},
				fnEriksonExecPreguntar: function(entrada, cadena, ejecuta){
					this.eConsole.append(eTp.preguntar.replace("@text", cadena));
					this.fnRefreshUI();
					$(".entrada:last").css("border-bottom", "1px dashed rgb(154, 194, 97)");
					this.eErikson.eFollow=false;
					var eriksonInstance=this.eErikson;					
					$(".entrada").keypress(function(e){
						if(e.charCode==13){	
							e.preventDefault();							
							eriksonInstance.Memory.fnEriksonAddEntry(entrada, $(this).val());	
							eriksonInstance.Interpreter.SintacticAnalyzer.Syntax.fnEriksonProgram(ejecuta);
						}
					});					
				},
				fnRefreshUI: function(){
					$(".elements").slideDown(500);
				}
			},
			/* Inicia el proceso de Interpretación */
			fnEriksonStart: function(){
				this.CodeGenerator.fnEriksonInitCodeGenerator(this.eErikson);
				var Success=this.SintacticAnalyzer.fnEriksonAnalsin();				

				return Success;				
			},
			fnEriksonInitInterpreter: function(erikson, withlimits){
				this.eErikson=erikson;				
				this.LexicalAnalyzer.fnEriksonInitLexicalAnalizer(erikson);
				this.SintacticAnalyzer.fnEriksonInitSintacticAnalyzer(erikson);
				this.eRequireLimits=withlimits;
			},
		},	
		fnGUIResAnimate: function(cad){
			this.eResults.fadeIn(100);
			$("#Res", this.eResults).html(cad);
			var res=this.eResults;
			setInterval(function(){
				res.slideUp(2000);
			}, 2000);
		},
		/* Iniciar Erikson */
		fnInitErikson: function(string, limits){			
			this.eResults=$("#Resultado");
			this.eErrorer=$("#Errorer");
			this.eErrContent=$("#Errors")
			this.eIndex=0x0000;
			this.eLine=0x0000;
			this.eString=string;
			this.eRequireLimits=limits;
			this.eLength=this.eString.length;
			this.Memory.fnEriksonDeallocateMemory();
			this.SymTab.fnEriksonLoadTable();				
			this.Interpreter.fnEriksonInitInterpreter(this, limits);
			console.log("ERIKSON is loaded =) !!");
			var Success=this.Interpreter.fnEriksonStart();
			this.eErrContent.slideUp(300);	
			
			if(Success){
				this.fnGUIResAnimate("Genial !!");
				this.eIndex=0x0000;
				this.eLine=0x0000;
				this.ePasada=0x0002;
				this.Memory.fnEriksonDeallocateMemory();
				this.SymTab.fnEriksonLoadTable();				
				this.Interpreter.fnEriksonInitInterpreter(this, limits);
				Success=this.Interpreter.fnEriksonStart();
				if(Success)
					this.fnGUIResAnimate("Funciona !!");
			}
			else{
				this.eErrContent.slideDown(300);
				this.fnGUIResAnimate("Algo salió mal")				
				this.eErrorer.html('');
				this.eErrorer.html(this.eErrorLog);
			}
		},
	};
}
/* global functions  */
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
};