<?php
require 'config.php';

/* Definir la clase principal */
class modelo {
    //propiedades
    protected $_db;

    // constructor co la coexion BD
    public function __construc(){
        $this->_db = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
        if( $this->_db->connect_error ) {
            echo 'falllo al conectar a MySQL: '.$this->_db->connect_error;
            return;

        }
        $this->_db->set_charset(DB_CHARSET);
        $this->_db->query("SET NAMES 'utf8");
    }
}
/* din de la clase principal */
/* clase ModeloABM basada en la clase principal */
class ModeloABM extends Modelo {
    //propiedades
    private $tabla;         //nombre de la tabla
    private $id=0;          //id del registro
    private $criterio = ''; //criterio de las consultas
    private $campos ='*';   //lista de campos
    private $orden ='id';   //campis de ordenamientos
    private $limit = 0;     //cantidad de registros

    //constrictor
    public function __construct($t) {
        parent::__construct(); //ejecutamos el contructor padre
        $this->tabla = $t;     //asignamos a tabla el parametro $t
    }
    /* GETTER */
    public function get_tabla() {
        return $this->tabla;
    }
    public function get_id() {
        return $this->id;
    }
    public function get_criterio() {
        return $this->criterio;
    }
    public function get_campos() {
        return $this->campos;
    }
    public function get_orden() {
        return $this->orden;
    }
    public function get_limit() {
        return $this->limit;
    }
    /* SETTER */
    public function set_tabla() {
        return $this->tabla;
    }
    public function set_id() {
        return $this->id;
    }
    public function set_criterio() {
        return $this->criterio;
    }
    public function set_campos() {
        return $this->campos;
    }
    public function set_orden() {
        return $this->orden;
    }
    public function set_limit() {
        return $this->limit;
    }
    
    /**
     * Metodo de insercion datos
     * @param valores los valores a isertar
     */
    public function insertar($valores){
        //INSERT INTRO articulo (codigo, nombre, descripcion, precio, imagen)
        //VALUES ('201', 'Samsung Galaxy S20', 'Procesador:xxx', )
        $campos = '';
        $datos = '';

        //recorrer el objeto $valores
        foreach($valores as $key=>$value){
            $value = "'".$value."'";
            $campos .= $key.", ";
            $daros .= $value.", ";
        }
        $campos = substr($campos,0,strlen($campos)-1);
        $datos = substr($datos,0,strlen($datos)-1);
        
        //intruccion SQL
        $sql = "INSERT INTO $this->tabla($campos) VALUE($datos)";
        echo $sql;
        $this->_db->query($sql);
    }
}

?>