#!/bin/bash
# Elimina los tags locales que no son remotos
git fetch --prune --prune-tags

echo "Tags locales no remotos eliminados"

# Obtiene el último tag en la rama master
LAST_TAG=$(git describe --abbrev=0 --tags)

# Obtiene el número de versión en cada segmento (major, minor, patch) desde el último tag
MAJOR=$(echo $LAST_TAG | cut -d. -f1)
MINOR=$(echo $LAST_TAG | cut -d. -f2)
PATCH=$(echo $LAST_TAG | cut -d. -f3)

# Valida si los valores son nulos o vacíos y los establece en cero si es necesario
if [ -z "$MAJOR" ]; then
  MAJOR=0
fi

if [ -z "$MINOR" ]; then
  MINOR=0
fi

if [ -z "$PATCH" ]; then
  PATCH=0
fi

echo "$MAJOR."
echo "$MINOR."
echo "$PATCH."

# Incrementa el número de versión adecuadamente según el tipo de cambio realizado en el código
# Por ejemplo, si el último tag fue "1.2.3", el próximo tag será "1.2.4" para un cambio de parche
# Si se realiza un cambio menor, el tag sería "1.3.0", y para un cambio mayor sería "2.0.0"
if [[ "$CI_COMMIT_MESSAGE" == "major"* || "$CI_COMMIT_MESSAGE" == *")!"* ]]; then
  ((MAJOR++))
  MINOR=0
  PATCH=0
elif [[ "$CI_COMMIT_MESSAGE" == "feature"* || "$CI_COMMIT_MESSAGE" == "feat"* ]]; then
  ((MINOR++))
  PATCH=0
else
  ((PATCH++))
fi

# Crea el nombre del tag con la nueva versión
TAG_NAME="$MAJOR.$MINOR.$PATCH"

echo "Usando tag: $TAG_NAME"

# Crea el tag en la rama master
git tag $TAG_NAME

echo "Tag $TAG_NAME creado localmente"

# Sube el tag al repositorio remoto
git push gitlab_runner_origin $TAG_NAME -o ci.skip

echo "Tag $TAG_NAME creado remotamente"

#echo "TAG=$TAG_NAME" > my_tag.txt

#echo "Creado archivo my_tag.txt"