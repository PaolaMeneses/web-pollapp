import React from "react";
import { Box, Kbd, Text } from "@chakra-ui/react";

function Instructions() {
  return (
    <>
      {/* <Box>Actualmente en construcción</Box> */}
      <Box mb="10px">
        <Box textAlign="center">
          <Text w="100%" as="b" color="brand.500">
            ¿Cómo jugar?
          </Text>
        </Box>
        <Text>
          Cuando se ingresa a una tabla, en la pestaña próximos aparecen todos
          los partidos con sus respectivos equipos a enfrentar y horarios en los
          que se va a jugar, para hacer la predicción se cuenta con dos botones{" "}
          <Kbd>+</Kbd> y <Kbd>-</Kbd> por cada equipo, para sumar o restar los
          goles que queremos poner a cada equipo, un boton <Kbd>Aleatorio</Kbd>{" "}
          que nos ayuda a escoger un resultado aleatorio para los dos equipos
          del 0 al 6 y otro boton <Kbd>GUARDAR PREDICCIÓN</Kbd> que como dice
          guarda la predicción en la aplicación.
          <br /> Las predicciones se pueden hacer justo antes de la hora del
          partido, ejemplo: el primer partido se juega el 20 de Nov a las
          11:00am (Hora Colombia), entonces para hacer la predicción de ese
          partido se puede hasta el 20 de Nov a las 10:59am (Hora Colombia).
          <br />
          <br />
          <Text as="b">Nota:</Text> Si tiene varias tablas debe poner la
          predicción en cada una de ellas y los puntos se suman por tabla y no
          por usuario.
        </Text>
      </Box>
      <Box mb="10px">
        <Box textAlign="center">
          <Text w="100%" as="b" color="brand.500">
            ¿Cómo se ganan puntos?
          </Text>
        </Box>
        <Text>
          Una vez finalice el partido se sube el resultado final, se tendrá en
          cuenta los goles de los 90min reglamentarios, más goles de tiempo
          extra (si se da el caso) y no se tendra encuentra los goles en sección
          de penales (si se da el caso).
          <br />
          <br />
          Los puntos se asignan de la siguiente manera: <br />
          - Si se adivina el resultado exacto gana 3 puntos.
          <br />
          - Si se adivina el ganador o que hay empate gana 1 punto.
          <br />- En cualquier otro caso son 0 puntos.
          <br />
          <br />
          <Text as="b">Ejemplo 1:</Text> Si en un partido el resultado final
          fue: 2-1
          <br />
          -Los que pusieron en la predicción 2-1 ganan 3 puntos.
          <br />
          -Los que pusieron en la predicción 3-0 ganan 1 puntos porque
          adivinaron el equipo ganador.
          <br />
          -Los que pusieron en la predicción 1-1 o 1-2 o no pusieron resultado
          ganan 0 puntos porque no adivinaron ni el marcador exacto ni el equipo
          ganador.
          <br />
          <br />
          <Text as="b">Ejemplo 2:</Text> Si en un partido el resultado final
          fue: 2-2 (empate)
          <br />
          -Los que pusieron en la predicción 2-2 ganan 3 puntos.
          <br />
          -Los que pusieron en la predicción 1-1 ganan 1 puntos porque
          adivinaron que el partido quedaba en empate.
          <br />
          -Los que pusieron en la predicción 3-1 o 1-2 o no pusieron resultado
          ganan 0 puntos porque no adivinaron ni el marcador exacto ni el
          empate.
        </Text>
      </Box>
      <Box mb="10px">
        <Box textAlign="center">
          <Text w="100%" as="b" color="brand.500">
            ¿Cómo se determina las posiciones?
          </Text>
        </Box>
        <Text>
          Las posiciones se ordenan por la tabla que más puntos tenga, sumando
          los puntos ganados de los partidos que se han jugado, tambien se tiene
          en cuenta la cantidad de partidos en los que ha ganado 3 puntos (P3P)
          y la cantidad de partidos en los que ha ganado 1 punto (P1P) de mayor
          a menor.
        </Text>
      </Box>
    </>
  );
}

export default Instructions;
