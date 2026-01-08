import { useState, useEffect } from 'react';
import { Plus, Trash2, User, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  ownerApi,
  type RegistroCompletoData,
  type CatalogoOwner 
} from '../api';

interface TelefonoForm {
  id: string;
  numero: string;
  tipo_telefono_id: string;
  nombre_contacto: string;
  relacion_contacto: string;
  es_principal: boolean;
  es_mismo_propietario: boolean;
  notas: string;
}

interface DireccionForm {
  id: string;
  tipo_domicilio_id: string;
  calle: string;
  num_exterior: string;
  num_interior: string;
  codigo_postal: string;
  colonia_id: string;
  estado_id: string;
  municipio_id: string;
  fecha_inicio: string;
  fecha_fin: string;
  es_predeterminada: boolean;
  notas: string;
}

const Input = ({ label, type = 'text', value, onChange, required, disabled, placeholder }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-black ml-1">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black disabled:bg-gray-100 disabled:cursor-not-allowed"
    />
  </div>
);

const Select = ({ label, value, onChange, options, required, disabled, placeholder }: any) => {
  console.log('label ', label, ' Select options:', options, 'Array?', Array.isArray(options));

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-black ml-1">*</span>}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="">{placeholder || 'Seleccione una opción'}</option>

        {options.map((opt: CatalogoOwner) => (
          <option key={opt.id} value={opt.id}>
            {opt.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};


const Checkbox = ({ label, checked, onChange }: any) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
    />
    <span className="text-sm text-gray-700">{label}</span>
  </label>
);

const RegistroPropietario = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    correo_electronico: '',
    password: '',
    confirmar_password: '',
    nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
  });

  const [tiposTelefono, setTiposTelefono] = useState<CatalogoOwner[]>([]);
  const [tiposDomicilio, setTiposDomicilio] = useState<CatalogoOwner[]>([]);
  const [estados, setEstados] = useState<CatalogoOwner[]>([]);
  const [municipios, setMunicipios] = useState<CatalogoOwner[]>([]);
  const [colonias, setColonias] = useState<CatalogoOwner[]>([]);

  const [telefonos, setTelefonos] = useState<TelefonoForm[]>([{
    id: '1',
    numero: '',
    tipo_telefono_id: '',
    nombre_contacto: '',
    relacion_contacto: '',
    es_principal: true,
    es_mismo_propietario: false,
    notas: '',
  }]);

  const [direcciones, setDirecciones] = useState<DireccionForm[]>([]);
  const [buscandoCP, setBuscandoCP] = useState(false);

  useEffect(() => {
    cargarCatalogos();
  }, []);

  const cargarCatalogos = async () => {
    try {
      const [tiposTel, tiposDom, est] = await Promise.all([
        ownerApi.getTiposTelefono(),
        ownerApi.getTiposDomicilio(),
        ownerApi.getEstados(),
      ]);

      console.log('tiposTel:', tiposTel);
      console.log('Array?', Array.isArray(tiposTel));
      console.log('tiposDom:', tiposDom);
      console.log('Array?', Array.isArray(tiposDom));
      console.log('est:', est);
      console.log('Array?', Array.isArray(est));

      setTiposTelefono(tiposTel);
      setTiposDomicilio(tiposDom);
      setEstados(est);
    } catch (err) {
      console.error('Error cargando catálogos:', err);
      setError('Error al cargar los catálogos. Por favor recarga la página.');
    }
  };

  const buscarCodigoPostal = async (cp: string, direccionId?: string) => {

    setBuscandoCP(true);
    try {
      const data = await ownerApi.buscarCodigoPostal(cp);

      console.log("estos son los datos: ", data)
      console.log("estas son las colonias: ", data.colonias, 'Array?', Array.isArray(data.colonias))
      setColonias(data.colonias)
      
      if (direccionId) {
        setDirecciones(prev => prev.map(dir => 
          dir.id === direccionId 
            ? {
                ...dir,
                estado_id: String(data.estado_id),
                municipio_id: String(data.municipio_id),
                colonia_id: '',
              }
            : dir
        ));
        setMunicipios([{ id: data.municipio_id, nombre: data.municipio }]);
      }
    } catch (error) {
      console.error('Error buscando código postal:', error);
      alert('No se encontró información para el código postal ingresado');
    } finally {
      setBuscandoCP(false);
    }
  };

  const agregarTelefono = () => {
    const nuevoTelefono: TelefonoForm = {
      id: Date.now().toString(),
      numero: '',
      tipo_telefono_id: '',
      nombre_contacto: '',
      relacion_contacto: '',
      es_principal: false,
      es_mismo_propietario: false,
      notas: '',
    };
    setTelefonos([...telefonos, nuevoTelefono]);
  };

  const eliminarTelefono = (id: string) => {
    if (telefonos.length === 1) {
      alert('Debe mantener al menos un teléfono');
      return;
    }
    setTelefonos(telefonos.filter(tel => tel.id !== id));
  };

  const actualizarTelefono = (id: string, campo: string, valor: any) => {
    setTelefonos(telefonos.map(tel => {
      if (tel.id === id) {
        const actualizado = { ...tel, [campo]: valor };
        
        if (campo === 'es_mismo_propietario' && valor === true) {
          actualizado.nombre_contacto = formData.nombre + ' ' + formData.primer_apellido;
          actualizado.relacion_contacto = 'Propietario';
        }
        
        if (campo === 'es_principal' && valor === true) {
          setTelefonos(prev => prev.map(t => 
            t.id === id ? actualizado : { ...t, es_principal: false }
          ));
          return actualizado;
        }
        
        return actualizado;
      }
      return tel;
    }));
  };

  const agregarDireccion = () => {
    const nuevaDireccion: DireccionForm = {
      id: Date.now().toString(),
      tipo_domicilio_id: '',
      calle: '',
      num_exterior: '',
      num_interior: '',
      codigo_postal: '',
      colonia_id: '',
      estado_id: '',
      municipio_id: '',
      fecha_inicio: '',
      fecha_fin: '',
      es_predeterminada: direcciones.length === 0,
      notas: '',
    };
    setDirecciones([...direcciones, nuevaDireccion]);
  };

  const eliminarDireccion = (id: string) => {
    setDirecciones(direcciones.filter(dir => dir.id !== id));
  };

  const actualizarDireccion = (id: string, campo: string, valor: any) => {
    console.log("Buscando direcciones, campo: ", campo, "valor_length: ", valor.length)
    setDirecciones(direcciones.map(dir => {
      if (dir.id === id) {
        const actualizado = { ...dir, [campo]: valor };
        
        if (campo === 'codigo_postal' && valor.length === 5) {
          buscarCodigoPostal(valor, id);
          console.log("Buscando codigo postal")
        }
        
        if (campo === 'es_predeterminada' && valor === true) {
          setDirecciones(prev => prev.map(d => 
            d.id === id ? actualizado : { ...d, es_predeterminada: false }
          ));
          return actualizado;
        }
        
        return actualizado;
      }
      return dir;
    }));
  };

  const validarFormulario = (): string | null => {
    if (!formData.correo_electronico || !formData.password || !formData.nombre || !formData.primer_apellido) {
      return 'Por favor completa todos los campos obligatorios';
    }

    if (formData.password !== formData.confirmar_password) {
      return 'Las contraseñas no coinciden';
    }

    if (formData.password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }

    if (telefonos.length === 0) {
      return 'Debe agregar al menos un teléfono';
    }

    for (const tel of telefonos) {
      if (!tel.numero || !tel.tipo_telefono_id) {
        return 'Todos los teléfonos deben tener número y tipo';
      }
      if (!tel.es_mismo_propietario && (!tel.nombre_contacto || !tel.relacion_contacto)) {
        return 'Los teléfonos de terceros deben tener nombre y relación';
      }
    }

    for (const dir of direcciones) {
      if (!dir.tipo_domicilio_id || !dir.calle || !dir.num_exterior || !dir.codigo_postal || 
          !dir.colonia_id || !dir.estado_id || !dir.municipio_id || !dir.fecha_inicio) {
            console.log(dir)
        return 'Todas las direcciones deben completar los campos obligatorios';
      }
    }

    return null;
  };

  const handleSubmit = async () => {
    setError(null);
    
    const errorValidacion = validarFormulario();
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }

    setLoading(true);

    try {
      const datosRegistro: RegistroCompletoData = {
        propietario: {
          correo_electronico: formData.correo_electronico,
          password: formData.password,
          nombre: formData.nombre,
          primer_apellido: formData.primer_apellido,
          segundo_apellido: formData.segundo_apellido || undefined,
        },
        telefonos: telefonos.map(tel => ({
          numero: tel.numero,
          tipo_telefono_id: parseInt(tel.tipo_telefono_id),
          nombre_contacto: tel.nombre_contacto,
          relacion_contacto: tel.relacion_contacto,
          es_principal: tel.es_principal,
          notas: tel.notas || undefined,
        })),
        direcciones: direcciones.map(dir => ({
          tipo_domicilio_id: parseInt(dir.tipo_domicilio_id),
          calle: dir.calle,
          num_exterior: dir.num_exterior,
          num_interior: dir.num_interior || undefined,
          codigo_postal: dir.codigo_postal,
          colonia_id: parseInt(dir.colonia_id),
          estado_id: parseInt(dir.estado_id),
          municipio_id: parseInt(dir.municipio_id),
          fecha_inicio: dir.fecha_inicio,
          fecha_fin: dir.fecha_fin || null,
          es_predeterminada: dir.es_predeterminada,
          notas: dir.notas || undefined,
        })),
      };

      await ownerApi.registerComplete(datosRegistro);
      
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      navigate('/login-page');
    } catch (err: any) {
      console.error('Error en registro:', err);
      setError(err.response?.data?.error || 'Error al registrar. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Registro de Propietario
          </h1>
          <p className="text-gray-600">Hotel de Mascotas</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Información Personal */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 text-black mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Información Personal
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Correo Electrónico"
                type="email"
                value={formData.correo_electronico}
                onChange={(val: string) => setFormData({ ...formData, correo_electronico: val })}
                required
              />
              <Input
                label="Nombre"
                value={formData.nombre}
                onChange={(val: string) => setFormData({ ...formData, nombre: val })}
                required
              />
              <Input
                label="Primer Apellido"
                value={formData.primer_apellido}
                onChange={(val: string) => setFormData({ ...formData, primer_apellido: val })}
                required
              />
              <Input
                label="Segundo Apellido"
                value={formData.segundo_apellido}
                onChange={(val: string) => setFormData({ ...formData, segundo_apellido: val })}
              />
              <Input
                label="Contraseña"
                type="password"
                value={formData.password}
                onChange={(val: string) => setFormData({ ...formData, password: val })}
                required
              />
              <Input
                label="Confirmar Contraseña"
                type="password"
                value={formData.confirmar_password}
                onChange={(val: string) => setFormData({ ...formData, confirmar_password: val })}
                required
              />
            </div>
          </div>

          {/* Teléfonos */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-black mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Teléfonos de Contacto
                </h2>
              </div>
              <button
                onClick={agregarTelefono}
                className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                disabled={loading}
              >
                <Plus className="w-4 h-4 mr-1" />
                Agregar
              </button>
            </div>

            <div className="space-y-6">
              {telefonos.map((tel, index) => (
                <div key={tel.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-700">
                      Teléfono #{index + 1}
                    </h3>
                    {telefonos.length > 1 && (
                      <button
                        onClick={() => eliminarTelefono(tel.id)}
                        className="text-gray-500 hover:text-red-600"
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Número"
                      value={tel.numero}
                      onChange={(val: string) => actualizarTelefono(tel.id, 'numero', val)}
                      required
                      placeholder="5512345678"
                    />
                    <Select
                      label="Tipo de Teléfono"
                      value={tel.tipo_telefono_id}
                      onChange={(val: string) => actualizarTelefono(tel.id, 'tipo_telefono_id', val)}
                      options={tiposTelefono}
                      required
                    />
                    
                    <div className="md:col-span-2">
                      <Checkbox
                        label="Este teléfono me pertenece"
                        checked={tel.es_mismo_propietario}
                        onChange={(val: boolean) => actualizarTelefono(tel.id, 'es_mismo_propietario', val)}
                      />
                    </div>

                    {!tel.es_mismo_propietario && (
                      <>
                        <Input
                          label="Nombre del Contacto"
                          value={tel.nombre_contacto}
                          onChange={(val: string) => actualizarTelefono(tel.id, 'nombre_contacto', val)}
                          required
                        />
                        <Input
                          label="Relación"
                          value={tel.relacion_contacto}
                          onChange={(val: string) => actualizarTelefono(tel.id, 'relacion_contacto', val)}
                          required
                          placeholder="Ej: Familiar, Amigo"
                        />
                      </>
                    )}

                    <div className="md:col-span-2">
                      <Checkbox
                        label="Teléfono principal"
                        checked={tel.es_principal}
                        onChange={(val: boolean) => actualizarTelefono(tel.id, 'es_principal', val)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Input
                        label="Notas"
                        value={tel.notas}
                        onChange={(val: string) => actualizarTelefono(tel.id, 'notas', val)}
                        placeholder="Información adicional..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direcciones */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className='flex items-center'>
                  <MapPin className="w-5 h-5 text-black mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Direcciones Durante el Hospedaje
                  </h2>
                </div>
                <p className='text-gray-400 text-sm mt-1'>
                  Direcciones donde te encontrarás mientras la mascota esté hospedada
                </p>
              </div>
              <button
                onClick={agregarDireccion}
                className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                disabled={loading}
              >
                <Plus className="w-4 h-4 mr-1" />
                Agregar
              </button>
            </div>

            {direcciones.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="font-medium">No hay direcciones agregadas</p>
                <p className="text-sm mt-1">Agrega direcciones donde te alojarás durante el hospedaje</p>
              </div>
            ) : (
              <div className="space-y-6">
                {direcciones.map((dir, index) => (
                  <div key={dir.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-gray-700">
                        Dirección #{index + 1}
                      </h3>
                      <button
                        onClick={() => eliminarDireccion(dir.id)}
                        className="text-gray-500 hover:text-red-600"
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        label="Tipo de Domicilio"
                        value={dir.tipo_domicilio_id}
                        onChange={(val: string) => actualizarDireccion(dir.id, 'tipo_domicilio_id', val)}
                        options={tiposDomicilio}
                        required
                      />
                      
                      <Input
                        label="Código Postal"
                        value={dir.codigo_postal}
                        onChange={(val: string) => actualizarDireccion(dir.id, 'codigo_postal', val)}
                        required
                        placeholder="12345"
                      />

                      <Select
                        label="Estado"
                        value={dir.estado_id}
                        onChange={(val: string) => actualizarDireccion(dir.id, 'estado_id', val)}
                        options={estados}
                        required
                        disabled={buscandoCP || !dir.codigo_postal}
                      />

                      <Select
                        label="Municipio"
                        value={dir.municipio_id}
                        onChange={(val: string) => actualizarDireccion(dir.id, 'municipio_id', val)}
                        options={municipios}
                        required
                        disabled={buscandoCP || !dir.codigo_postal}
                      />

                      <Select
                        label="Colonia"
                        value={dir.colonia_id}
                        onChange={(val: string) => actualizarDireccion(dir.id, 'colonia_id', val)}
                        options={colonias}
                        required
                        disabled={buscandoCP || !dir.codigo_postal}
                      />

                      <Input
                        label="Calle"
                        value={dir.calle}
                        onChange={(val: string) => actualizarDireccion(dir.id, 'calle', val)}
                        required
                      />

                      <Input
                        label="Número Exterior"
                        value={dir.num_exterior}
                        onChange={(val: string) => actualizarDireccion(dir.id, 'num_exterior', val)}
                        required
                      />

                      <Input
                        label="Número Interior"
                        value={dir.num_interior}
                        onChange={(val: string) => actualizarDireccion(dir.id, 'num_interior', val)}
                        placeholder="Opcional"
                      />

                      <Input
                        label="Fecha Inicio"
                        type="date"
                        value={dir.fecha_inicio}
                        onChange={(val: string) => actualizarDireccion(dir.id, 'fecha_inicio', val)}
                        required
                      />

                      <Input
                        label="Fecha Fin"
                        type="date"
                        value={dir.fecha_fin}
                        onChange={(val: string) => actualizarDireccion(dir.id, 'fecha_fin', val)}
                        placeholder="Opcional"
                      />

                      <div className="md:col-span-2">
                        <Checkbox
                          label="Dirección predeterminada"
                          checked={dir.es_predeterminada}
                          onChange={(val: boolean) => actualizarDireccion(dir.id, 'es_predeterminada', val)}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Input
                          label="Notas"
                          value={dir.notas}
                          onChange={(val: string) => actualizarDireccion(dir.id, 'notas', val)}
                          placeholder="Información adicional..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-4 pb-8">
            <button
              onClick={() => navigate('/login-page')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroPropietario;
