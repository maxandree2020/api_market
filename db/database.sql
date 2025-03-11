create database if not exists API_MARKET;
use API_MARKET;
/*
create table cat_productos(
	cod varchar(10) not null primary key,
    tit varchar(100),
    des varchar(100) 
);
insert into cat_productos()values('CAT_000001','HOGAR','PRODUCTOS PARA EL HOGAR');

create table marcas(
	cod varchar(10) not null primary key,
    tit varchar(100), 
	des varchar(200)
);
insert into marcas values
('M-1','ASCIS','fibra de poliéster exterior de color');
*/

DROP TABLE IF EXISTS `cat_productos`;
CREATE TABLE `cat_productos` (
  `cod` varchar(10) NOT NULL,
  `tit` varchar(100) DEFAULT NULL,
  `des` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`cod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `colores`;
CREATE TABLE `colores` (
  `cod` int(11) NOT NULL AUTO_INCREMENT,
  `tit` varchar(50) NOT NULL,
  `des` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`cod`),
  UNIQUE KEY `tit` (`tit`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
DROP TABLE IF EXISTS `marcas`;
CREATE TABLE `marcas` (
  `cod` varchar(10) NOT NULL,
  `tit` varchar(100) DEFAULT NULL,
  `des` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`cod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
DROP TABLE IF EXISTS `prendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prendas` (
  `cod` varchar(10) NOT NULL,
  `mar` varchar(10) DEFAULT NULL,
  `tit` varchar(50) DEFAULT NULL,
  `des` varchar(200) DEFAULT NULL,
  `talla` varchar(4) DEFAULT NULL,
  `cat` varchar(10) DEFAULT NULL,
  `col` int(11) DEFAULT NULL,
  PRIMARY KEY (`cod`),
  KEY `categoria` (`cat`),
  KEY `marca` (`mar`),
  KEY `col` (`col`),
  CONSTRAINT `prendas_ibfk_2` FOREIGN KEY (`cat`) REFERENCES `cat_productos` (`cod`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `prendas_ibfk_3` FOREIGN KEY (`mar`) REFERENCES `marcas` (`cod`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `prendas_ibfk_4` FOREIGN KEY (`col`) REFERENCES `colores` (`cod`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `prendas_v`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prendas_v` (
  `cod` varchar(10) NOT NULL,
  `pre` varchar(10) DEFAULT NULL,
  `cant` int(11) DEFAULT NULL,
  `prec_men` decimal(8,2) DEFAULT NULL,
  `prec_may` decimal(8,2) DEFAULT NULL,
  `estado` bit(1) DEFAULT NULL,
  PRIMARY KEY (`cod`),
  KEY `pre` (`pre`),
  CONSTRAINT `prendas_v_ibfk_1` FOREIGN KEY (`pre`) REFERENCES `prendas` (`cod`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `createCode`() RETURNS varchar(10) CHARSET utf8mb4 COLLATE utf8mb4_general_ci
BEGIN
    return upper(left(MD5(NOW()), 10));
END ;;
DELIMITER ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `createColor`(in _tit varchar(50),in _des varchar(100))
BEGIN
	DECLARE total,id,i,num INTEGER;
	SET i=1;	
	repeat
		set num= (select count(*) from colores where cod=i);
		set id=i;
		set i = i+1;
    until(num=0)
    end repeat;
	insert into colores(cod,tit,des)values(id,_tit,_des);
    select * from colores where cod=id;
END ;;
DELIMITER ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `createPrendas`(
	in _mar varchar(10),
    in _tit varchar(200),
    in _des varchar(200),
    in _talla varchar(4),
    in _cat varchar(10), 
    in _col int
)
BEGIN
	declare id varchar(10);
    set id = createCode(); 
	insert into prendas(cod,mar,tit,des,talla,cat,col)
    values(id,_mar,_tit,_des,_talla,_cat,_col);
    select*from prendas where cod= id;
END ;;
DELIMITER ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `createPrenda_v`(
in _pre varchar(10),
in _cant int,
in _prec_men decimal(8,2),
in _prec_may decimal(8,2)
)
BEGIN
	declare _cod varchar(10);
    declare es bit ;
    set es=0;
    if _cant>0 then
		set es=1;
	end if;
    set _cod = createCode();
    insert into prendas_v(cod,pre,cant,prec_men,prec_may,estado)
    values(_cod,_pre,_cant,_prec_men,_prec_may,es);
    select * from prendas_v where cod=_cod;
END ;;
DELIMITER ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateColor`(in a int, in b varchar(50), in c varchar(100))
BEGIN
	update colores set tit=ifnull(b,tit), des=ifnull(c,des) where cod = a;
    select*from colores where cod=a;
END ;;
DELIMITER ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updatePrenda`(
	in _code varchar(11),
    in _marca varchar(10),
    in _tit varchar(50),
    in _des varchar(200),
    in _talla varchar(4),
    in _cat varchar(10),
    in _col int
)
BEGIN
	update prendas set mar=ifnull(_marca,mar), tit=ifnull(_tit,tit),
		des=ifnull(_des,des), talla=ifnull(_talla,talla), 
        cat=ifnull(_cat,cat), col=ifnull(_col,col) where cod = _code;
	select*from prendas where cod=_code;
END ;;
DELIMITER ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updatePrendas_v`(
	in _cod varchar(11),
    in _pre varchar(10),
    in _cant int,
    in _prec_men decimal(8,2),
    in _prec_may decimal(8,2)
)
BEGIN
	update prendas_v set pre = ifnull(_pre,pre), cant=ifnull(_cant,cant),
		prec_men=ifnull(_prec_men,prec_men),prec_may=ifnull(_prec_may,prec_may)
        where cod = _cod;
	select*from prendas_v where cod=_cod;
END ;;
DELIMITER ;
