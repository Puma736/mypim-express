-- =============================================================================
-- ESQUEMA RELACIONAL Y MOTOR REACTIVO EN TIEMPO REAL (PostgreSQL 15+)
-- PLATAFORMA: MY PIM EXPRESS (EDICIÓN COSMÉTICA & BELLEZA)
-- HACKATÓN HACKBIZ 2026 - UAGRM
-- =============================================================================

BEGIN;

-- -----------------------------------------------------------------------------
-- 0. EXTENSIONES Y ENUMS CONTROLADOS
-- -----------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enum para roles de usuarios
CREATE TYPE rol_usuario_enum AS ENUM (
    'emprendedor',
    'admin'
);

-- Enum para subrubros cosméticos oficiales
CREATE TYPE subrubro_cosmetico_enum AS ENUM (
    'SR-01_ARTESANAL',
    'SR-02_DERMOCOSMETICA',
    'SR-03_MAQUILLAJE',
    'SR-04_CABINA'
);

-- Enum para unidades de medida en matriz y fórmula
CREATE TYPE unidad_medida_enum AS ENUM (
    'g',
    'kg',
    'ml',
    'l',
    'gotas'
);

-- -----------------------------------------------------------------------------
-- 1. TABLA: usuarios
-- -----------------------------------------------------------------------------
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    nombre_completo VARCHAR(150) NOT NULL,
    telefono_whatsapp VARCHAR(30),
    rol rol_usuario_enum NOT NULL DEFAULT 'emprendedor',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_email_formato CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- -----------------------------------------------------------------------------
-- 2. TABLA: emprendimientos
-- -----------------------------------------------------------------------------
CREATE TABLE emprendimientos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    nombre_comercial VARCHAR(150) NOT NULL,
    subrubro subrubro_cosmetico_enum NOT NULL DEFAULT 'SR-01_ARTESANAL',
    municipio VARCHAR(100) NOT NULL DEFAULT 'Santa Cruz de la Sierra',
    porcentaje_formalizacion NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_porcentaje_formalizacion CHECK (porcentaje_formalizacion BETWEEN 0.00 AND 100.00)
);

-- -----------------------------------------------------------------------------
-- 3. TABLA: tramites_catalogo (Catálogo maestro legal boliviano)
-- -----------------------------------------------------------------------------
CREATE TABLE tramites_catalogo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo VARCHAR(30) NOT NULL UNIQUE,
    titulo VARCHAR(200) NOT NULL,
    entidad VARCHAR(150) NOT NULL,
    descripcion TEXT,
    costo_referencial_bs NUMERIC(12,4) NOT NULL DEFAULT 0.0000,
    subrubros_aplicables subrubro_cosmetico_enum[] NOT NULL,
    orden_paso INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_costo_referencial_positivo CHECK (costo_referencial_bs >= 0.0000),
    CONSTRAINT chk_orden_paso_positivo CHECK (orden_paso > 0)
);

-- -----------------------------------------------------------------------------
-- 4. TABLA: progreso_tramites
-- -----------------------------------------------------------------------------
CREATE TABLE progreso_tramites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    emprendimiento_id UUID NOT NULL REFERENCES emprendimientos(id) ON DELETE CASCADE,
    tramite_id UUID NOT NULL REFERENCES tramites_catalogo(id) ON DELETE CASCADE,
    completado BOOLEAN NOT NULL DEFAULT FALSE,
    fecha_completado TIMESTAMPTZ,
    notas TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_emprendimiento_tramite UNIQUE (emprendimiento_id, tramite_id)
);

-- -----------------------------------------------------------------------------
-- 5. TABLA: recetas_costeo (Cabecera de formulación cosmética)
-- -----------------------------------------------------------------------------
CREATE TABLE recetas_costeo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    emprendimiento_id UUID NOT NULL REFERENCES emprendimientos(id) ON DELETE CASCADE,
    nombre_producto VARCHAR(200) NOT NULL,
    tamano_lote_unidades INT NOT NULL DEFAULT 1,
    volumen_unidad_ml_g NUMERIC(12,4) NOT NULL DEFAULT 0.0000,
    porcentaje_merma NUMERIC(5,2) NOT NULL DEFAULT 5.00,
    horas_mano_obra NUMERIC(12,4) NOT NULL DEFAULT 0.0000,
    tarifa_hora_operario NUMERIC(12,4) NOT NULL DEFAULT 0.0000,
    costos_indirectos_cif NUMERIC(12,4) NOT NULL DEFAULT 0.0000,
    costos_fijos_mensuales NUMERIC(12,4) NOT NULL DEFAULT 0.0000,
    margen_minorista_deseado NUMERIC(5,2) NOT NULL DEFAULT 55.00,
    margen_mayorista_deseado NUMERIC(5,2) NOT NULL DEFAULT 30.00,

    -- Campos calculados almacenados (actualizados dinámicamente por trigger)
    costo_materia_prima NUMERIC(12,4) NOT NULL DEFAULT 0.0000,
    costo_packaging NUMERIC(12,4) NOT NULL DEFAULT 0.0000,
    costo_total_lote NUMERIC(12,4) NOT NULL DEFAULT 0.0000,
    costo_unitario_produccion NUMERIC(12,4) NOT NULL DEFAULT 0.0000,
    precio_venta_publico_sugerido NUMERIC(12,4) NOT NULL DEFAULT 0.0000,
    precio_mayorista_sugerido NUMERIC(12,4) NOT NULL DEFAULT 0.0000,
    punto_equilibrio_unidades INT NOT NULL DEFAULT 0,
    punto_equilibrio_ingresos_bs NUMERIC(12,4) NOT NULL DEFAULT 0.0000,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_tamano_lote CHECK (tamano_lote_unidades > 0),
    CONSTRAINT chk_porcentaje_merma CHECK (porcentaje_merma BETWEEN 0.00 AND 50.00),
    CONSTRAINT chk_horas_mano_obra CHECK (horas_mano_obra >= 0.0000),
    CONSTRAINT chk_tarifa_hora CHECK (tarifa_hora_operario >= 0.0000),
    CONSTRAINT chk_cif CHECK (costos_indirectos_cif >= 0.0000),
    CONSTRAINT chk_margen_minorista CHECK (margen_minorista_deseado BETWEEN 1.00 AND 95.00),
    CONSTRAINT chk_margen_mayorista CHECK (margen_mayorista_deseado BETWEEN 1.00 AND 95.00)
);

-- -----------------------------------------------------------------------------
-- 6. TABLA: receta_ingredientes (Detalle materias primas por lote)
-- -----------------------------------------------------------------------------
CREATE TABLE receta_ingredientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    receta_id UUID NOT NULL REFERENCES recetas_costeo(id) ON DELETE CASCADE,
    nombre_ingrediente VARCHAR(150) NOT NULL,
    nomenclatura_inci VARCHAR(200),
    costo_compra_matriz NUMERIC(12,4) NOT NULL DEFAULT 0.0000,
    cantidad_compra_matriz NUMERIC(12,4) NOT NULL DEFAULT 1.0000,
    unidad_medida_matriz unidad_medida_enum NOT NULL DEFAULT 'g',
    cantidad_usada_lote NUMERIC(12,4) NOT NULL DEFAULT 0.0000,
    unidad_usada unidad_medida_enum NOT NULL DEFAULT 'g',
    costo_proporcional_calculado NUMERIC(12,4) NOT NULL DEFAULT 0.0000,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_costo_compra CHECK (costo_compra_matriz >= 0.0000),
    CONSTRAINT chk_cant_matriz CHECK (cantidad_compra_matriz > 0.0000),
    CONSTRAINT chk_cant_usada CHECK (cantidad_usada_lote >= 0.0000)
);

-- -----------------------------------------------------------------------------
-- 7. TABLA: receta_packaging (Detalle envases y presentación)
-- -----------------------------------------------------------------------------
CREATE TABLE receta_packaging (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    receta_id UUID NOT NULL REFERENCES recetas_costeo(id) ON DELETE CASCADE,
    concepto VARCHAR(150) NOT NULL,
    costo_unitario NUMERIC(12,4) NOT NULL DEFAULT 0.0000,
    cantidad_por_lote INT NOT NULL DEFAULT 1,
    costo_total_item NUMERIC(12,4) NOT NULL DEFAULT 0.0000,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_costo_unitario_pkg CHECK (costo_unitario >= 0.0000),
    CONSTRAINT chk_cant_pkg CHECK (cantidad_por_lote >= 1)
);

-- =============================================================================
-- CREACIÓN DE ÍNDICES B-TREE ESTRATÉGICOS
-- =============================================================================

CREATE INDEX idx_emprendimientos_usuario_id ON emprendimientos(usuario_id);
CREATE INDEX idx_emprendimientos_subrubro ON emprendimientos(subrubro);
CREATE INDEX idx_emprendimientos_municipio ON emprendimientos(municipio);

CREATE INDEX idx_progreso_tramites_emprendimiento ON progreso_tramites(emprendimiento_id);
CREATE INDEX idx_progreso_tramites_tramite ON progreso_tramites(tramite_id);

CREATE INDEX idx_recetas_costeo_emprendimiento ON recetas_costeo(emprendimiento_id);
CREATE INDEX idx_receta_ingredientes_receta ON receta_ingredientes(receta_id);
CREATE INDEX idx_receta_packaging_receta ON receta_packaging(receta_id);

-- =============================================================================
-- PROCEDIMIENTOS Y TRIGGERS (TIEMPO REAL EN PL/pgsql)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- TRIGGER 1: trigger_update_timestamp (Mantenimiento automático de updated_at)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_usuarios_timestamp
BEFORE UPDATE ON usuarios
FOR EACH ROW EXECUTE FUNCTION fn_update_timestamp();

CREATE TRIGGER trg_emprendimientos_timestamp
BEFORE UPDATE ON emprendimientos
FOR EACH ROW EXECUTE FUNCTION fn_update_timestamp();

CREATE TRIGGER trg_progreso_tramites_timestamp
BEFORE UPDATE ON progreso_tramites
FOR EACH ROW EXECUTE FUNCTION fn_update_timestamp();

CREATE TRIGGER trg_recetas_costeo_timestamp
BEFORE UPDATE ON recetas_costeo
FOR EACH ROW EXECUTE FUNCTION fn_update_timestamp();

CREATE TRIGGER trg_receta_ingredientes_timestamp
BEFORE UPDATE ON receta_ingredientes
FOR EACH ROW EXECUTE FUNCTION fn_update_timestamp();

CREATE TRIGGER trg_receta_packaging_timestamp
BEFORE UPDATE ON receta_packaging
FOR EACH ROW EXECUTE FUNCTION fn_update_timestamp();

-- -----------------------------------------------------------------------------
-- HELPER FUNCTION: Conversión de unidades a base estándar (g / ml)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_convertir_a_base(p_cantidad NUMERIC, p_unidad unidad_medida_enum)
RETURNS NUMERIC AS $$
BEGIN
    CASE p_unidad
        WHEN 'kg' THEN RETURN p_cantidad * 1000.0000;
        WHEN 'l'  THEN RETURN p_cantidad * 1000.0000;
        WHEN 'gotas' THEN RETURN p_cantidad * 0.0500; -- 20 gotas ≈ 1 ml
        ELSE RETURN p_cantidad; -- 'g' o 'ml'
    END CASE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- -----------------------------------------------------------------------------
-- TRIGGER 2: trigger_calcular_costeo_completo (Cálculo Cascada y Pub/Sub)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_recalcular_receta(p_receta_id UUID)
RETURNS VOID AS $$
DECLARE
    v_receta RECORD;
    v_costo_mp_bruto NUMERIC(12,4) := 0.0000;
    v_costo_mp_con_merma NUMERIC(12,4) := 0.0000;
    v_costo_packaging_total NUMERIC(12,4) := 0.0000;
    v_costo_mod NUMERIC(12,4) := 0.0000;
    v_costo_total_lote NUMERIC(12,4) := 0.0000;
    v_cup NUMERIC(12,4) := 0.0000;
    v_pvp_retail NUMERIC(12,4) := 0.0000;
    v_pvp_wholesale NUMERIC(12,4) := 0.0000;
    v_cif_unidad NUMERIC(12,4) := 0.0000;
    v_costo_var_sin_cif NUMERIC(12,4) := 0.0000;
    v_margen_contribucion NUMERIC(12,4) := 0.0000;
    v_pe_unidades INT := 0;
    v_pe_ingresos NUMERIC(12,4) := 0.0000;
BEGIN
    -- 1. Obtener cabecera de la receta
    SELECT * INTO v_receta FROM recetas_costeo WHERE id = p_receta_id;
    IF NOT FOUND THEN
        RETURN;
    END IF;

    -- 2. Recalcular e ingresar costo proporcional de cada ingrediente
    UPDATE receta_ingredientes ing
    SET costo_proporcional_calculado = 
        CASE 
            WHEN fn_convertir_a_base(ing.cantidad_compra_matriz, ing.unidad_medida_matriz) > 0 THEN
                (ing.costo_compra_matriz / fn_convertir_a_base(ing.cantidad_compra_matriz, ing.unidad_medida_matriz))
                * fn_convertir_a_base(ing.cantidad_usada_lote, ing.unidad_usada)
            ELSE 0.0000
        END
    WHERE ing.receta_id = p_receta_id;

    -- 3. Sumar materia prima bruta y aplicar merma
    SELECT COALESCE(SUM(costo_proporcional_calculado), 0.0000)
    INTO v_costo_mp_bruto
    FROM receta_ingredientes
    WHERE receta_id = p_receta_id;

    v_costo_mp_con_merma := v_costo_mp_bruto * (1.0000 + (v_receta.porcentaje_merma / 100.00));

    -- 4. Recalcular e ingresar costo de packaging por ítem
    UPDATE receta_packaging
    SET costo_total_item = costo_unitario * cantidad_por_lote
    WHERE receta_id = p_receta_id;

    SELECT COALESCE(SUM(costo_total_item), 0.0000)
    INTO v_costo_packaging_total
    FROM receta_packaging
    WHERE receta_id = p_receta_id;

    -- 5. Calcular MOD y Costo Total del Lote
    v_costo_mod := v_receta.horas_mano_obra * v_receta.tarifa_hora_operario;
    v_costo_total_lote := v_costo_mp_con_merma + v_costo_packaging_total + v_costo_mod + v_receta.costos_indirectos_cif;
    
    -- 6. Costo Unitario de Producción (CUP)
    v_cup := v_costo_total_lote / GREATEST(1, v_receta.tamano_lote_unidades);

    -- 7. Precios Sugeridos
    v_pvp_retail := v_cup / (1.0000 - (LEAST(95.00, v_receta.margen_minorista_deseado) / 100.00));
    v_pvp_wholesale := v_cup / (1.0000 - (LEAST(95.00, v_receta.margen_mayorista_deseado) / 100.00));

    -- 8. Punto de Equilibrio Mensual
    v_cif_unidad := v_receta.costos_indirectos_cif / GREATEST(1, v_receta.tamano_lote_unidades);
    v_costo_var_sin_cif := v_cup - v_cif_unidad;
    v_margen_contribucion := v_pvp_retail - v_costo_var_sin_cif;

    IF v_margen_contribucion > 0 AND v_receta.costos_fijos_mensuales > 0 THEN
        v_pe_unidades := CEIL(v_receta.costos_fijos_mensuales / v_margen_contribucion);
    ELSE
        v_pe_unidades := 0;
    END IF;
    v_pe_ingresos := v_pe_unidades * v_pvp_retail;

    -- 9. Actualizar cabecera recetas_costeo (Desactivando temporalmente triggers de timestamp para evitar recursion)
    UPDATE recetas_costeo
    SET 
        costo_materia_prima = v_costo_mp_con_merma,
        costo_packaging = v_costo_packaging_total,
        costo_total_lote = v_costo_total_lote,
        costo_unitario_produccion = v_cup,
        precio_venta_publico_sugerido = v_pvp_retail,
        precio_mayorista_sugerido = v_pvp_wholesale,
        punto_equilibrio_unidades = v_pe_unidades,
        punto_equilibrio_ingresos_bs = v_pe_ingresos
    WHERE id = p_receta_id;

    -- 10. NOTIFICACIÓN REACTIVA EN TIEMPO REAL (Pub/Sub para WebSockets)
    PERFORM pg_notify('receta_actualizada', json_build_object(
        'receta_id', p_receta_id,
        'costo_unitario', v_cup,
        'pvp_sugerido', v_pvp_retail,
        'timestamp', NOW()
    )::text);
END;
$$ LANGUAGE plpgsql;

-- Trigger sobre detalles (ingredientes y packaging)
CREATE OR REPLACE FUNCTION fn_trg_recalcular_detalles()
RETURNS TRIGGER AS $$
DECLARE
    v_target_receta_id UUID;
BEGIN
    IF TG_OP = 'DELETE' THEN
        v_target_receta_id := OLD.receta_id;
    ELSE
        v_target_receta_id := NEW.receta_id;
    END IF;

    PERFORM fn_recalcular_receta(v_target_receta_id);
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_recalcular_ingredientes
AFTER INSERT OR UPDATE OR DELETE ON receta_ingredientes
FOR EACH ROW EXECUTE FUNCTION fn_trg_recalcular_detalles();

CREATE TRIGGER trg_recalcular_packaging
AFTER INSERT OR UPDATE OR DELETE ON receta_packaging
FOR EACH ROW EXECUTE FUNCTION fn_trg_recalcular_detalles();

-- -----------------------------------------------------------------------------
-- TRIGGER 3: trigger_actualizar_progreso_legal
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_actualizar_progreso_legal()
RETURNS TRIGGER AS $$
DECLARE
    v_emp_id UUID;
    v_subrubro subrubro_cosmetico_enum;
    v_total_requeridos INT := 0;
    v_total_completados INT := 0;
    v_porcentaje NUMERIC(5,2) := 0.00;
BEGIN
    IF TG_OP = 'DELETE' THEN
        v_emp_id := OLD.emprendimiento_id;
    ELSE
        v_emp_id := NEW.emprendimiento_id;
    END IF;

    -- Obtener subrubro del emprendimiento
    SELECT subrubro INTO v_subrubro FROM emprendimientos WHERE id = v_emp_id;

    -- Contar trámites aplicables al subrubro
    SELECT COUNT(*) INTO v_total_requeridos
    FROM tramites_catalogo
    WHERE v_subrubro = ANY(subrubros_aplicables);

    -- Contar trámites completados
    SELECT COUNT(*) INTO v_total_completados
    FROM progreso_tramites pt
    JOIN tramites_catalogo tc ON pt.tramite_id = tc.id
    WHERE pt.emprendimiento_id = v_emp_id
      AND pt.completado = TRUE
      AND v_subrubro = ANY(tc.subrubros_aplicables);

    IF v_total_requeridos > 0 THEN
        v_porcentaje := ROUND((v_total_completados::NUMERIC / v_total_requeridos::NUMERIC) * 100.00, 2);
    ELSE
        v_porcentaje := 0.00;
    END IF;

    -- Actualizar emprendimiento
    UPDATE emprendimientos
    SET porcentaje_formalizacion = v_porcentaje
    WHERE id = v_emp_id;

    -- Notificación en tiempo real
    PERFORM pg_notify('formalizacion_actualizada', json_build_object(
        'emprendimiento_id', v_emp_id,
        'porcentaje_formalizacion', v_porcentaje
    )::text);

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_actualizar_progreso_legal
AFTER INSERT OR UPDATE OR DELETE ON progreso_tramites
FOR EACH ROW EXECUTE FUNCTION fn_actualizar_progreso_legal();

-- =============================================================================
-- POBLADO INICIAL DEL CATÁLOGO LEGAL BOLIVIANO (SEPREC, SIN, GAM, BPM, AGEMED)
-- =============================================================================

INSERT INTO tramites_catalogo (codigo, titulo, entidad, descripcion, costo_referencial_bs, subrubros_aplicables, orden_paso)
VALUES
('SEPREC-01', 'Matrícula de Comercio Unipersonal / SRL', 'SEPREC', 'Obtención de Matrícula de Comercio Digital', 260.0000, ARRAY['SR-01_ARTESANAL', 'SR-02_DERMOCOSMETICA', 'SR-03_MAQUILLAJE', 'SR-04_CABINA']::subrubro_cosmetico_enum[], 1),
('SIN-01', 'Inscripción al NIT PBD-digital', 'Impuestos Nacionales', 'Obtención de NIT y habilitación de facturación SIAT', 0.0000, ARRAY['SR-01_ARTESANAL', 'SR-02_DERMOCOSMETICA', 'SR-03_MAQUILLAJE', 'SR-04_CABINA']::subrubro_cosmetico_enum[], 2),
('GAM-01', 'Licencia de Funcionamiento Municipal', 'Alcaldía Municipal (SCZ/LP/CBBA/EA)', 'Inspección de bioseguridad y autorización municipal', 350.0000, ARRAY['SR-01_ARTESANAL', 'SR-02_DERMOCOSMETICA', 'SR-03_MAQUILLAJE', 'SR-04_CABINA']::subrubro_cosmetico_enum[], 3),
('BPM-01', 'Adecuación BPM Simplificadas de Taller', 'AGEMED / Estándar Técnico', 'Superficies lavables, EPP y agua desmineralizada', 400.0000, ARRAY['SR-01_ARTESANAL', 'SR-02_DERMOCOSMETICA', 'SR-03_MAQUILLAJE']::subrubro_cosmetico_enum[], 4),
('AGEMED-01', 'Notificación Sanitaria Obligatoria (NSO CAN 516/833)', 'AGEMED', 'Tramitación de NSO cosmética con Regente Farmacéutico', 1500.0000, ARRAY['SR-01_ARTESANAL', 'SR-02_DERMOCOSMETICA', 'SR-03_MAQUILLAJE']::subrubro_cosmetico_enum[], 5),
('INCI-01', 'Ficha y Estándar de Rotulado e INCI', 'AGEMED / Norma Técnica', 'Verificación de fórmula cualitativa y advertencias en etiqueta', 100.0000, ARRAY['SR-01_ARTESANAL', 'SR-02_DERMOCOSMETICA', 'SR-03_MAQUILLAJE']::subrubro_cosmetico_enum[], 6)
ON CONFLICT (codigo) DO NOTHING;

COMMIT;
