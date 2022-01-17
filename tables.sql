drop table fire_ball_data;
drop table summary;
drop table final;
drop table data;


create table fire_ball_data(
date varchar,
time varchar,
energy FLOAT(25), 
impactenergy FLOAT(25),
latitude FLOAT(25),
latdirection varchar(2),
longitude FLOAT(25),
londirection varchar(2),   
altitude_km FLOAT(25),
velocity_kms varchar,
primary key (date, time));

select * from fire_ball_data;

create table Sentry(
id serial primary key,
energy FLOAT,	
ip	FLOAT,
ts	int,
date varchar,
sigma_vi FLOAT,
ps	FLOAT,
des varchar,
FOREIGN KEY (des) REFERENCES summary(des)
);

select * from Sentry;


create table summary (
energy FLOAT, 
darc varchar, 
ip FLOAT, 
h FLOAT,
nobs int,  
mass FLOAT, 
v_inf FLOAT,
first_obs varchar ,
method varchar,
pdate varchar,
ndop int,
cdate varchar, 
ps_cum FLOAT, 
diameter FLOAT,
ndel int,
v_imp FLOAT,
ps_max FLOAT ,
last_obs varchar, 
fullname varchar,
n_imp int , 
ts_max int,
nsat int ,
des varchar primary key
)
select * from summary
 

create table cad(
id serial primary key,
des	varchar, 
orbit_id varchar,	
jd FLOAT,	
cd varchar,	
dist FLOAT,
dist_min FLOAT,
dist_max FLOAT,	
v_rel FLOAT,
v_inf varchar,
t_sigma_f varchar,
h FLOAT
)

select * from final
