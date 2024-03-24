--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2024-03-24 03:28:14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 40976)
-- Name: file_fdw; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS file_fdw WITH SCHEMA public;


--
-- TOC entry 4882 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION file_fdw; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION file_fdw IS 'foreign-data wrapper for flat file access';


--
-- TOC entry 225 (class 1255 OID 40962)
-- Name: update_creation_date(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_creation_date() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
  NEW."creationDate" := NOW();
  RETURN NEW;
END;$$;


ALTER FUNCTION public.update_creation_date() OWNER TO postgres;

--
-- TOC entry 226 (class 1255 OID 40970)
-- Name: update_last_modified(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_last_modified() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW."lastModified" := NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_last_modified() OWNER TO postgres;

--
-- TOC entry 228 (class 1255 OID 40974)
-- Name: update_questionnaire_last_modified_from_answer(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_questionnaire_last_modified_from_answer() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  questionId INT;
  questionnaireId INT;
BEGIN
  -- Get the questionId from the updated answer
  questionId := NEW."questionId";
  
  -- Get the questionnaireId from the question
  SELECT "questionnaireId" INTO questionnaireId
  FROM "Question"
  WHERE id = questionId;
    
  -- Update the lastModified of the corresponding Questionnaire
  UPDATE "Questionnaire"
  SET "lastModified" = NOW()
  WHERE id = questionnaireId;
  
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_questionnaire_last_modified_from_answer() OWNER TO postgres;

--
-- TOC entry 227 (class 1255 OID 40972)
-- Name: update_questionnaire_last_modified_from_question(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_questionnaire_last_modified_from_question() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  UPDATE "Questionnaire"
  SET "lastModified" = NOW()
  WHERE id = NEW."questionnaireId";

  RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_questionnaire_last_modified_from_question() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 32769)
-- Name: Answer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Answer" (
    id integer NOT NULL,
    "questionId" integer NOT NULL,
    "creatorName" character varying(256) NOT NULL,
    "targetParticipantName" character varying(256) NOT NULL,
    value character varying(256),
    "lastModified" timestamp without time zone,
    "isValid" boolean
);


ALTER TABLE public."Answer" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 32768)
-- Name: Answer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Answer" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Answer_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 24585)
-- Name: Question; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Question" (
    id integer NOT NULL,
    value character varying(256) NOT NULL,
    "questionnaireId" integer NOT NULL,
    "lastModified" timestamp without time zone
);


ALTER TABLE public."Question" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 24584)
-- Name: Question_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Question" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Question_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 217 (class 1259 OID 24577)
-- Name: Questionnaire; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Questionnaire" (
    id integer NOT NULL,
    name character varying NOT NULL,
    "creatorName" character varying NOT NULL,
    "participantNames" character varying[] NOT NULL,
    "creationDate" timestamp without time zone,
    "lastModified" timestamp without time zone
);


ALTER TABLE public."Questionnaire" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 24576)
-- Name: Questionnaire_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Questionnaire" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Questionnaire_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 49187)
-- Name: databasechangelog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.databasechangelog (
    id character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    filename character varying(255) NOT NULL,
    dateexecuted timestamp without time zone NOT NULL,
    orderexecuted integer NOT NULL,
    exectype character varying(10) NOT NULL,
    md5sum character varying(35),
    description character varying(255),
    comments character varying(255),
    tag character varying(255),
    liquibase character varying(20),
    contexts character varying(255),
    labels character varying(255),
    deployment_id character varying(10)
);


ALTER TABLE public.databasechangelog OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 49192)
-- Name: databasechangeloglock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.databasechangeloglock (
    id integer NOT NULL,
    locked boolean NOT NULL,
    lockgranted timestamp without time zone,
    lockedby character varying(255)
);


ALTER TABLE public.databasechangeloglock OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 49184)
-- Name: try; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.try (
    name bigint
);


ALTER TABLE public.try OWNER TO postgres;

--
-- TOC entry 4724 (class 2606 OID 32775)
-- Name: Answer Answer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_pkey" PRIMARY KEY (id);


--
-- TOC entry 4721 (class 2606 OID 24591)
-- Name: Question Question_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_pkey" PRIMARY KEY (id);


--
-- TOC entry 4719 (class 2606 OID 24583)
-- Name: Questionnaire Questionnaire_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Questionnaire"
    ADD CONSTRAINT "Questionnaire_pkey" PRIMARY KEY (id);


--
-- TOC entry 4726 (class 2606 OID 49196)
-- Name: databasechangeloglock databasechangeloglock_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.databasechangeloglock
    ADD CONSTRAINT databasechangeloglock_pkey PRIMARY KEY (id);


--
-- TOC entry 4722 (class 1259 OID 24597)
-- Name: fki_fk_questionnaire_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_questionnaire_id ON public."Question" USING btree ("questionnaireId");


--
-- TOC entry 4728 (class 2620 OID 40963)
-- Name: Questionnaire set_creation_date_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_creation_date_trigger BEFORE INSERT ON public."Questionnaire" FOR EACH ROW EXECUTE FUNCTION public.update_creation_date();


--
-- TOC entry 4729 (class 2620 OID 40971)
-- Name: Questionnaire set_last_modified_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_last_modified_trigger BEFORE UPDATE ON public."Questionnaire" FOR EACH ROW EXECUTE FUNCTION public.update_last_modified();


--
-- TOC entry 4732 (class 2620 OID 49182)
-- Name: Answer update_last_modified; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_last_modified BEFORE INSERT OR UPDATE ON public."Answer" FOR EACH ROW EXECUTE FUNCTION public.update_last_modified();


--
-- TOC entry 4730 (class 2620 OID 49183)
-- Name: Question update_last_modified_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_last_modified_trigger BEFORE INSERT OR UPDATE ON public."Question" FOR EACH ROW EXECUTE FUNCTION public.update_last_modified();


--
-- TOC entry 4733 (class 2620 OID 49181)
-- Name: Answer update_questionnaire_last_modified_from_answer_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_questionnaire_last_modified_from_answer_trigger BEFORE INSERT OR UPDATE ON public."Answer" FOR EACH ROW EXECUTE FUNCTION public.update_questionnaire_last_modified_from_answer();


--
-- TOC entry 4731 (class 2620 OID 40973)
-- Name: Question update_questionnaire_last_modified_from_question; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_questionnaire_last_modified_from_question AFTER UPDATE ON public."Question" FOR EACH ROW EXECUTE FUNCTION public.update_questionnaire_last_modified_from_question();


--
-- TOC entry 4727 (class 2606 OID 24592)
-- Name: Question fk_questionnaire_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT fk_questionnaire_id FOREIGN KEY ("questionnaireId") REFERENCES public."Questionnaire"(id) NOT VALID;


-- Completed on 2024-03-24 03:28:15

--
-- PostgreSQL database dump complete
--

