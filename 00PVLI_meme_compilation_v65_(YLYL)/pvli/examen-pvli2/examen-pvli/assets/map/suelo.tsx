<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.8" tiledversion="1.8.5" name="suelo" tilewidth="8" tileheight="8" tilecount="3" columns="3">
 <image source="../sprites/tileset.png" width="24" height="8"/>
 <tile id="0">
  <properties>
   <property name="colisiion" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="6" x="0" y="0" width="8" height="8"/>
  </objectgroup>
 </tile>
 <tile id="1">
  <properties>
   <property name="colision" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0" y="0" width="8" height="8"/>
  </objectgroup>
 </tile>
 <tile id="2">
  <properties>
   <property name="colision" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="0" y="0" width="8" height="8"/>
   <object id="2" x="0" y="0" width="8" height="8"/>
  </objectgroup>
 </tile>
</tileset>
