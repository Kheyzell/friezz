--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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
-- Name: file_fdw; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS file_fdw WITH SCHEMA public;


--
-- Name: EXTENSION file_fdw; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION file_fdw IS 'foreign-data wrapper for flat file access';


--
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
-- Name: Answer Answer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_pkey" PRIMARY KEY (id);


--
-- Name: Question Question_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_pkey" PRIMARY KEY (id);


--
-- Name: Questionnaire Questionnaire_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Questionnaire"
    ADD CONSTRAINT "Questionnaire_pkey" PRIMARY KEY (id);


--
-- Name: fki_fk_questionnaire_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_questionnaire_id ON public."Question" USING btree ("questionnaireId");


--
-- Name: Questionnaire set_creation_date_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_creation_date_trigger BEFORE INSERT ON public."Questionnaire" FOR EACH ROW EXECUTE FUNCTION public.update_creation_date();


--
-- Name: Questionnaire set_last_modified_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_last_modified_trigger BEFORE UPDATE ON public."Questionnaire" FOR EACH ROW EXECUTE FUNCTION public.update_last_modified();


--
-- Name: Answer update_last_modified; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_last_modified BEFORE INSERT OR UPDATE ON public."Answer" FOR EACH ROW EXECUTE FUNCTION public.update_last_modified();


--
-- Name: Question update_last_modified_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_last_modified_trigger BEFORE INSERT OR UPDATE ON public."Question" FOR EACH ROW EXECUTE FUNCTION public.update_last_modified();


--
-- Name: Answer update_questionnaire_last_modified_from_answer_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_questionnaire_last_modified_from_answer_trigger BEFORE INSERT OR UPDATE ON public."Answer" FOR EACH ROW EXECUTE FUNCTION public.update_questionnaire_last_modified_from_answer();


--
-- Name: Question update_questionnaire_last_modified_from_question; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_questionnaire_last_modified_from_question AFTER UPDATE ON public."Question" FOR EACH ROW EXECUTE FUNCTION public.update_questionnaire_last_modified_from_question();


--
-- Name: Question fk_questionnaire_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT fk_questionnaire_id FOREIGN KEY ("questionnaireId") REFERENCES public."Questionnaire"(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

