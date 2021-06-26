#!/bin/env zsh

registry="ren776"

SERVICES=('ServicioAutenticacion:autenticacion'
'Servicio-Carrito_Compras:compras'
'Servicio-CRUD-libros:libros'
'Servicio-generosliterarios:generos'
'ServicioESB:esb'
'Servicio-Impuestos:impuestos'
'Servicio-Solicitud_libros:solicitud'
'ServicioTienda:tienda')

NEXT_VERSION=$(cat << 'EOF'
END{
  cap=10
  for (c=NF; c>=1; c--){
    num[c]=0
  }
  num[NF]=1
  for (c=NF; c>=1; c--){
    num[c] = num[c] + $c
    if(num[c] >= cap && c > 1){
      num[c] = 0
      num[c-1] = num[c-1] + 1
    }
  }
  m=""
  for (c=NF; c>=1; c--){
    if(c>1){
      m="."num[c]m
    } else {
      m=num[c]""m
    }
  }
  print m
}
EOF
)
